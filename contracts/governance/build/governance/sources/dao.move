

module governance::dao {
    use aptos_framework::account::{SignerCapability, create_signer_with_capability};
    use aptos_framework::account;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::coin;
    use aptos_framework::timestamp;
    use aptos_std::table::Table;
    use aptos_std::table;
    use aptos_token::property_map::PropertyMap;
    use aptos_token::property_map;
    use aptos_token::token::{Self, TokenId, create_token_id_raw};
    use std::bcs;
    use std::error;
    use std::option::{Self, Option};
    use std::signer;
    use std::string::{Self, String};
    use std::vector;

    /// This account doesn't have enough voting power
    const EVOTING_POWER_NOT_ENOUGH: u64 = 1;

    /// This account doesn't own this DAO's voting token
    const ENOT_OWN_THE_VOTING_DAO_TOKEN: u64 = 2;

    /// This function is not supported in proposal
    const ENOT_SUPPROTED_FUNCTION: u64 = 3;
    const ENOT_DEPLOYER_ADDRESS: u64 = 22;
    /// Can only propose a start time in future
    const EPROPOSAL_START_TIME_SHOULD_BE_IN_FUTURE: u64 = 4;

    /// Invalid admin account
    const EINVALID_ADMIN_ACCOUNT: u64 = 5;

    /// String length exceeds limits
    const ESTRING_TOO_LONG: u64 = 6;

    /// Proposal ended and no more voting
    const EPROPOSAL_ENDED: u64 = 7;

    /// Proposal has not ended yet
    const EPROPOSAL_NOT_END: u64 = 8;

    /// Proposal has not started voting
    const EPROPOSAL_NOT_STARTED: u64 = 9;

    /// Proposal has already been resolved
    const EPROPOSAL_RESOLVED: u64 = 10;

    /// Token already voted for the proposal
    const ETOKEN_ALREADY_VOTED: u64 = 11;

    /// DAO doesn't exist at this address
    const EDAO_NOT_EXIST: u64 = 12;

    /// Proposal resource not created
    const EPRPOSALS_NOT_EXIST_AT_ADDRESS: u64 = 13;

    /// Proposal with specified id doesn't exist
    const EPRPOSAL_ID_NOT_EXIST: u64 = 14;

    /// Token already used for creating proposal
    const ETOKEN_USED_FOR_CREATING_PROPOSAL: u64 = 15;

    /// DAO already offered for the new admin
    const EADMIN_ALREADY_OFFERED: u64 = 16;

    /// DAO offer doesn't exist
    const EADMIN_OFFER_NOT_EXIST: u64 = 17;

    /// Token name count doesn't match property_version count
    const ETOKEN_NAME_COUNT_NOT_MATCH_PROPERTY_VERSION_COUNT: u64 = 18;

    /// Proposal arguments count doesn't match function count
    const EPROPOSAL_ARG_COUNT_NOT_MATCH_FUNCTION_COUNT: u64 = 19;

    /// Proposal not found
    const EPROPOSAL_NOT_FOUND: u64 = 20;

    /// Voting statistics resource cannot be found. The DAO might have been incorrectly initialized
    const EVOTING_STATISTICS_NOT_FOUND: u64 = 21;

    /// Constants that represent the different state of DAO proposals.
    const PROPOSAL_PENDING: u8 = 0;
    const PROPOSAL_RESOLVED_PASSED: u8 = 1;
    const PROPOSAL_RESOLVED_NOT_PASSED: u8 = 2;
    const PROPOSAL_RESOLVED_BY_ADMIN: u8 = 3;
    const PROPOSAL_VETOED_BY_ADMIN: u8 = 4;

    /// The core struct that contains details and configurations of the DAO.
    struct DAO has key {
        /// The voting duration in secs.
        voting_duration: u64,
        /// The id that will be used for the next proposal.
        next_proposal_id: u64,
        /// The signer capability for the resource account where the DAO is hosted (aka the DAO account).
        dao_signer_capability: SignerCapability,
        /// The address of the DAO's admin who has certain permissions over the DAO.
        /// This can be set to 0x0 to remove all admin powers.
        creator: address,
        dev:vector<address>,
        members: vector<address>,
       mint_cap: coin::MintCapability<MOVEX>,
        burn_cap: coin::BurnCapability<MOVEX>,
    }

    struct MOVEX has key   {
    }

    /// All proposals
    struct Proposals has key {
        proposals: Table<u64, Proposal>,
    }

    /// Store the general information about a proposal
    struct Proposal has copy, drop, store {
        /// Name of the proposal, limiting to 64 chars
        name: String,
        /// Description of the proposal, limiting to 512 chars
        description: String,
        /// The start time of the voting
        start_time_sec: u64,
        /// Proposal results, unresolved, passed, not passed
        resolution: u8,
        /// final voting count of yes votes
        final_yes_votes: u64,
        /// final voting count of no votes
        final_no_votes: u64,
    }

    struct ProposalVotingStatistics has key {
        proposals: Table<u64, VotingStatistics>,
    }

    struct VotingStatistics has store {
        /// Total yes votes
        total_yes: u64,
        /// Total no notes
        total_no: u64,
    }

    //////////////////// All view functions ////////////////////////////////

    #[view]
    /// Get the proposal
    public fun get_proposal(proposal_id: u64): Proposal acquires Proposals {
        assert!(exists<Proposals>(@governance), error::not_found(EPRPOSALS_NOT_EXIST_AT_ADDRESS));
        let proposals = &borrow_global<Proposals>(@governance).proposals;
        assert!(table::contains(proposals, proposal_id), error::not_found(EPRPOSAL_ID_NOT_EXIST));
        *table::borrow(proposals, proposal_id)
    }

    #[view]
    /// Get the proposal resolution result
    public fun get_proposal_resolution(proposal_id: u64 ): u8 acquires Proposals {
        let proposal = get_proposal(proposal_id);
        proposal.resolution
    }

    #[view]
    public fun unpack_dao(): ( u64, u64, address,vector<address>,vector<address>) acquires DAO {
        let dao = borrow_global<DAO>(@governance);
        (
            dao.voting_duration,
            dao.next_proposal_id,
            dao.creator,
            dao.dev,
            dao.members
        )
    }

    /////////////////////////// DAO flow //////////////////////////////////
    /// Creator creates a DAO on the platform
   fun init_module(
        creator: &signer,
    ) {


        assert!(signer::address_of(creator) == @governance, ENOT_DEPLOYER_ADDRESS);
        let (res_signer, res_cap) = account::create_resource_account(creator, x"ff");
        let src_addr = signer::address_of(creator);

             // Only owner can create admin.

        // Create a resource account to hold the funds.
        let (resource, resource_cap) = account::create_resource_account(creator, x"aa");
        let (burn_cap, freeze_cap, mint_cap) = coin::initialize<MOVEX>(
            creator,
            string::utf8(b"MOVEX governance"),
            string::utf8(b"MOVEX"),
            18,
            false,
        );

        // We don't need to freeze the tokens.
        coin::destroy_freeze_cap(freeze_cap);

        // Register the resource account.
        coin::register<MOVEX>(creator);
        coin::register<AptosCoin>(&resource);
        // coin::register<MUSD>(&resource);


        move_to(
            creator,
            DAO {
                voting_duration:604800,
                next_proposal_id: 0,
                dao_signer_capability: res_cap,
                creator: src_addr,
                dev: vector::empty(),
                members: vector::empty(),
                mint_cap: mint_cap,
                burn_cap: burn_cap,
            },
        );
        move_to(
           creator,
            Proposals {
                proposals: table::new()
            }
        );

        move_to(
          creator,
            ProposalVotingStatistics {
                proposals: table::new()
            }
        );

        let dao_addr = signer::address_of(&res_signer);
        // create_dao_and_get_dao_address(admin);
    }




    /// Creator creates a DAO on the platform
    public fun create_dao_and_get_dao_address(
        creator: &signer,
    ): address {
        
        assert!(signer::address_of(creator) == @governance, ENOT_DEPLOYER_ADDRESS);
        let (res_signer, res_cap) = account::create_resource_account(creator, x"ff");
        let src_addr = signer::address_of(creator);

             // Only owner can create admin.

        // Create a resource account to hold the funds.
        let (resource, resource_cap) = account::create_resource_account(creator, x"aa");
        let (burn_cap, freeze_cap, mint_cap) = coin::initialize<MOVEX>(
            creator,
            string::utf8(b"MOVEX governance"),
            string::utf8(b"MOVEX"),
            18,
            false,
        );

        // We don't need to freeze the tokens.
        coin::destroy_freeze_cap(freeze_cap);

        // Register the resource account.
        coin::register<MOVEX>(creator);
        coin::register<AptosCoin>(&resource);
        // coin::register<MUSD>(&resource);


        move_to(
            &res_signer,
            DAO {
                voting_duration:604800,
                next_proposal_id: 0,
                dao_signer_capability: res_cap,
                creator: src_addr,
                dev: vector::empty(),
                members: vector::empty(),
                mint_cap: mint_cap,
                burn_cap: burn_cap,
            },
        );
        move_to(
            &res_signer,
            Proposals {
                proposals: table::new()
            }
        );

        move_to(
          &res_signer,
            ProposalVotingStatistics {
                proposals: table::new()
            }
        );

        let dao_addr = signer::address_of(&res_signer);
        dao_addr
    }


    public entry fun add_member(
        account: &signer,
        member: address,
        amountStaked: u64
    ) acquires DAO {
        let dao = borrow_global_mut<DAO>(@governance);
        let src_addr = signer::address_of(account);
        assert!(src_addr == dao.creator, error::permission_denied(EINVALID_ADMIN_ACCOUNT));

        if(!coin::is_account_registered<MOVEX>(src_addr)){
            coin::register<MOVEX>(account);
        };

        coin::deposit<MOVEX>(
            src_addr,
            coin::mint<MOVEX>(amountStaked, &dao.mint_cap),
        );
        vector::push_back(&mut dao.members, member);
    }

    public fun upgradeToDev(
        account: &signer,
        dev: address
    ) acquires DAO {
        let dao = borrow_global_mut<DAO>(@governance);
        let src_addr = signer::address_of(account);
        assert!(src_addr == dao.creator, error::permission_denied(EINVALID_ADMIN_ACCOUNT));
        vector::push_back(&mut dao.dev, dev);
    } 

    /// Only DAO Goverance token holders can create proposal
    public entry fun create_proposal(
        account: &signer,
        name: String,// name of the proposal
        description: String,// description of the proposal
        property_versions: vector<u64>,// the property versions of the corresponding tokens, the proposer want to use for proposing
    ) acquires DAO, Proposals {

        let dao = borrow_global_mut<DAO>(@governance);
        assert!(string::length(&name) <= 64, error::invalid_argument(ESTRING_TOO_LONG));
        assert!(string::length(&description) <= 512, error::invalid_argument(ESTRING_TOO_LONG));


        // verify the start_time is in future
        let start_time_sec= timestamp::now_seconds();

        let proposal = Proposal {
            name,
            description,
            start_time_sec,
            resolution: PROPOSAL_PENDING,
            final_yes_votes: 0,
            final_no_votes: 0,
        };

        let proposal_store = borrow_global_mut<Proposals>(@governance);
        let proposal_id = dao.next_proposal_id + 1;
        table::add(&mut proposal_store.proposals, proposal_id, proposal);
        dao.next_proposal_id = proposal_id;
        coin::burn<MOVEX>(
            coin::withdraw<MOVEX>(account,100000), &dao.burn_cap
        );
    }

    /// Vote with a batch of tokens
    public entry fun vote(
        account: &signer,
        proposal_id: u64,
        vote: bool,
    ) acquires DAO, ProposalVotingStatistics, Proposals {

        assert!(exists<DAO>(@governance), error::not_found(EDAO_NOT_EXIST));
        let dao = borrow_global_mut<DAO>(@governance);
        let proposals = borrow_global<Proposals>(@governance);

        // assert the proposal hasn't ended, voter can can only vote for the proposal that starts and hasn't ended
        assert!(table::contains(&proposals.proposals, proposal_id), error::not_found(EPROPOSAL_NOT_FOUND));
        let proposal = table::borrow(&proposals.proposals, proposal_id);
        let now = timestamp::now_seconds();
        assert!(now < proposal.start_time_sec + dao.voting_duration, error::invalid_argument(EPROPOSAL_ENDED));
        assert!(now > proposal.start_time_sec, error::invalid_argument(EPROPOSAL_NOT_STARTED));

        let prop_stats = borrow_global_mut<ProposalVotingStatistics>(@governance);

        // initialize the voting statistics of the proposal
        if (!table::contains(&prop_stats.proposals, proposal_id)) {
            let vstat = VotingStatistics {
                total_yes: 0,
                total_no: 0,
            };
            table::add(&mut prop_stats.proposals, proposal_id, vstat);
        };
        let stats = table::borrow_mut(&mut prop_stats.proposals, proposal_id);

        let voter_addr = signer::address_of(account);
        if(vote){
            stats.total_yes = stats.total_yes + 1;
        } else {
            stats.total_no = stats.total_no + 1;
        };
                // Burn MUSD tokens of user
        coin::burn<MOVEX>(
            coin::withdraw<MOVEX>(account,100000), &dao.burn_cap
        );
    }

    /// Anyone can call the resolve function to resolve a proposal.
    public entry fun resolve(proposal_id: u64) acquires Proposals, DAO, ProposalVotingStatistics {
        assert!(exists<DAO>(@governance), error::not_found(EDAO_NOT_EXIST));
        let dao = borrow_global<DAO>(@governance);
        // assert the proposal voting ended
        let proposals = borrow_global<Proposals>(@governance);
        assert!(table::contains(&proposals.proposals, proposal_id), error::not_found(EPROPOSAL_NOT_FOUND));
        let proposal = table::borrow(&proposals.proposals, proposal_id);
        let now = timestamp::now_seconds();
        assert!(now >= proposal.start_time_sec + dao.voting_duration, error::invalid_argument(EPROPOSAL_NOT_END));
        // assert the proposal is unresolved yet
        assert!(proposal.resolution == PROPOSAL_PENDING, error::invalid_argument(EPROPOSAL_RESOLVED));
        resolve_internal( proposal_id);
    }



    /// DAO admin can directly resolve a proposal
    public entry fun admin_resolve(admin: &signer, proposal_id: u64, nft_dao: address, reason: String) acquires  Proposals, ProposalVotingStatistics {
        let resolver = signer::address_of(admin);
        // assert the proposal voting ended
        let proposals = borrow_global<Proposals>(nft_dao);
        assert!(table::contains(&proposals.proposals, proposal_id), error::not_found(EPROPOSAL_NOT_FOUND));
        let proposal = table::borrow(&proposals.proposals, proposal_id);
        // assert the proposal is unresolved yet
        assert!(proposal.resolution == PROPOSAL_PENDING, error::invalid_argument(EPROPOSAL_RESOLVED));
        resolve_internal (proposal_id );
    }


   /// Admin disable the DAO admin through setting the admin to 0x0
    public entry fun disable_admin(admin: &signer, dao: address) acquires DAO {
        assert!(exists<DAO>(@governance), error::not_found(EDAO_NOT_EXIST));
        let admin_addr = signer::address_of(admin);
        let dao_config = borrow_global_mut<DAO>(dao);
        assert!(admin_addr == dao_config.creator, error::permission_denied(EINVALID_ADMIN_ACCOUNT));

        // make sure no one can be admin of the DAO
        dao_config.creator = @0x0;
    }

    /// Convenient batch update function for the admin to udpate multiple fields in the DAO.
    public entry fun admin_update_dao(
        admin: &signer,
        voting_duration: u64,
    ) acquires DAO {
        admin_change_dao_voting_duration(admin,  voting_duration);
    }



    /// Allow the admin to update the DAO's voting duration.
    public entry fun admin_change_dao_voting_duration(admin: &signer,  new_duration: u64) acquires DAO {
        assert!(exists<DAO>(@governance), error::not_found(EDAO_NOT_EXIST));
        let admin_addr = signer::address_of(admin);
        let dao_config = borrow_global_mut<DAO>(@governance);
        assert!(admin_addr == dao_config.creator, error::permission_denied(EINVALID_ADMIN_ACCOUNT));

        // update the dao name to a new name
        let old_duration = dao_config.voting_duration;
        dao_config.voting_duration = new_duration;
    }

    /// Allow the admin to update the DAO's min required voting power to create proposals.

    /// Unpack the proposal fields
    public fun unpack_proposal(proposal: &Proposal): (String, String,  u64, u8) {
        (
            proposal.name,
            proposal.description,
            proposal.start_time_sec,
            proposal.resolution,
        )
    }


    /// Resolve an proposal
    fun resolve_internal(proposal_id: u64) acquires Proposals, ProposalVotingStatistics {
        // validate if proposal is ready to resolve
        // assert the proposal voting ended
        let proposals = borrow_global_mut<Proposals>(@governance);
        let proposal = table::borrow_mut(&mut proposals.proposals, proposal_id);


        assert!(exists<ProposalVotingStatistics>(@governance), error::not_found(EVOTING_STATISTICS_NOT_FOUND));
        let proposal_stat = &mut borrow_global_mut<ProposalVotingStatistics>(@governance).proposals;
        let voting_stat = table::borrow_mut(proposal_stat, proposal_id);
        proposal.final_yes_votes = voting_stat.total_yes;
        proposal.final_no_votes = voting_stat.total_no;
        // validate resolve threshold and result
        if(voting_stat.total_yes > voting_stat.total_no) {
            proposal.resolution = PROPOSAL_RESOLVED_PASSED;
        } else {
            proposal.resolution = PROPOSAL_RESOLVED_NOT_PASSED;
        };
    }
}
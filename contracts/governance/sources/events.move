module governance::dao_events{
    use aptos_framework::event;
    use aptos_token::property_map::PropertyMap;
    use std::signer;
    use std::string::String;
    friend governance::dao;

    #[event]
    struct CreateDAO has drop, store {
        dao: address,
        creator: address,
    }

    #[event]
    struct CreateProposal has drop, store {
        nft_dao: address,
        proposer: address,
        proposal_id: u64,
        name: String,
        description: String,
        function_names: vector<String>,
        prosposal_arguments: vector<PropertyMap>,
        start_time_sec: u64,
        token_names: vector<String>,
        property_versions: vector<u64>,
    }

    #[event]
    struct Vote has drop, store {
        nft_dao: address,
        voter: address,
        proposal_id: u64,
        vote: bool,
        token_names: vector<String>,
        property_versions: vector<u64>,
    }

    #[event]
    struct Resolve has drop, store {
        nft_dao: address,
        proposal_id: u64,
        result: u8,
    }

    #[event]
    struct AdminResolve has drop, store {
        nft_dao: address,
        proposal_id: u64,
        admin: address,
        reason: String,
    }

    #[event]
    struct AdminVeto has drop, store {
        nft_dao: address,
        proposal_id: u64,
        admin: address,
        reason: String,
    }

    #[event]
    struct AdminOffer has drop, store {
        nft_dao: address,
        new_admin: address,
        admin: address,
    }

    #[event]
    struct AdminClaim has drop, store {
        nft_dao: address,
        new_admin: address,
        admin: address,
    }

    #[event]
    struct AdminOfferCancel has drop, store {
        nft_dao: address,
        admin: address,
    }

    #[event]
    struct DAONameChange has drop, store {
        nft_dao: address,
        old_name: String,
        new_name: String,
    }

    #[event]
    struct DAOThresholdChange has drop, store {
        nft_dao: address,
        old_threshold: u64,
        new_threshold: u64,
    }

    #[event]
    struct DAOVoteDurationChange has drop, store {
        nft_dao: address,
        old_duration: u64,
        new_duration: u64,
    }

    #[event]
    struct DAOReqiredVotingPowerChange has drop, store {
        nft_dao: address,
        old_power: u64,
        new_power: u64,
    }


    public(friend) fun emit_create_dao_event(
        dao: &signer,
        creator: address,
    ) {
        event::emit(CreateDAO {
            dao: signer::address_of(dao),
            creator,
        });
    }

    public(friend) fun emit_create_proposal_event(
        proposer: address,
        nft_dao: address,
        proposal_id: u64,
        name: String,
        description: String,
        function_names: vector<String>,
        prosposal_arguments: vector<PropertyMap>,
        start_time_sec: u64,
        token_names: vector<String>,
        property_versions: vector<u64>,
    ) {
        event::emit(CreateProposal {
            nft_dao,
            proposer,
            proposal_id,
            name,
            description,
            function_names,
            prosposal_arguments,
            start_time_sec,
            token_names,
            property_versions,
        });
    }

    public(friend) fun emit_voting_event(
        voter: address,
        nft_dao: address,
        proposal_id: u64,
        vote: bool,
        token_names: vector<String>,
        property_versions: vector<u64>,
    ) {
        event::emit(Vote {
            nft_dao,
            voter,
            proposal_id,
            vote,
            token_names,
            property_versions,
        });
    }

    public(friend) fun emit_resolve_event(proposal_id: u64, nft_dao: address, result: u8) {
        event::emit(Resolve {
            nft_dao,
            proposal_id,
            result,
        });
    }

    public(friend) fun emit_admin_offer_event(
        admin: address,
        new_admin: address,
        nft_dao: address
    ) {
        event::emit(AdminOffer {
            nft_dao,
            new_admin,
            admin,
        });
    }

    public(friend) fun emit_admin_claim_event(
        admin: address,
        new_admin: address,
        nft_dao: address
    ) {
        event::emit(AdminClaim {
            nft_dao,
            new_admin,
            admin,
        });
    }

    public(friend) fun emit_admin_offer_cancel_event(admin: address, nft_dao: address) {
        event::emit(AdminOfferCancel {
            nft_dao,
            admin,
        });
    }

    public(friend) fun emit_change_name_event(
        old_name: String,
        new_name: String,
        nft_dao: address
    ) {
        event::emit(DAONameChange {
            nft_dao,
            old_name,
            new_name,
        });
    }

    public(friend) fun emit_change_threshold_event(
        old_threshold: u64,
        new_threshold: u64,
        nft_dao: address
    ) {
        event::emit(DAOThresholdChange {
            nft_dao,
            old_threshold,
            new_threshold,
        });
    }

    public(friend) fun emit_change_duration_event(
        old_duration: u64,
        new_duration: u64,
        nft_dao: address
    ) {
        event::emit(DAOVoteDurationChange {
            nft_dao,
            old_duration,
            new_duration,
        });
    }

    public(friend) fun emit_change_voting_power_event(
        old_power: u64,
        new_power: u64,
        nft_dao: address
    ) {
        event::emit(DAOReqiredVotingPowerChange {
            nft_dao,
            old_power,
            new_power,
        });
    }

    public(friend) fun emit_admin_veto_event(
        proposal_id: u64,
        admin: address,
        nft_dao: address,
        reason: String
    ) {
        event::emit(AdminVeto {
            nft_dao,
            proposal_id,
            admin,
            reason,
        });
    }

    public(friend) fun emit_admin_resolve_event(
        proposal_id: u64,
        admin: address,
        nft_dao: address,
        reason: String
    ) {
        event::emit(AdminResolve {
            nft_dao,
            proposal_id,
            admin,
            reason,
        });
    }
}
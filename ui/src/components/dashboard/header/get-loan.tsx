import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useState, useEffect } from "react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet, InputTransactionData } from '@aptos-labs/wallet-adapter-react';
import { VAULT_CONTRACT } from "@/lib/contracts";
import { useToast } from "@/components/ui/use-toast";
// import { useWalletStore } from "@/hooks/useStore";
// import { Window as KeplrWindow } from "@keplr-wallet/types";
// import { SigningArchwayClient, StdFee, Coin } from '@archwayhq/arch3.js';
// import { ChainInfo } from "@/lib/chain";
const EXCHANGE_RATE_API = import.meta.env.VITE_EXCHANGE_RATE_API
const dataFetch = async () => {
  const res = await axios.get(EXCHANGE_RATE_API)
  const data = await res.data
  return data
}

import { useSubmitTransaction } from "@thalalabs/surf/hooks";
import { createSurfClient, createEntryPayload, EntryPayload } from "@thalalabs/surf";
import { VAULT_ABI } from "@/abi/vault";
import { useMUSDAmountStore } from "@/hooks/useStore";
// export default function GetLoan() {


//   const dynamic_collaterizatoin_value = async () => {
//     if (window.keplr && walletAddress) {
//       const offlineSigner = window.keplr.getOfflineSigner(ChainInfo.chainId);
//       const CosmWasmClient = await SigningArchwayClient.connectWithSigner(ChainInfo.rpc, offlineSigner);
//       const CONTRACT_ADDRESS = import.meta.env.VITE_VAULT_CONTRACT;

//       let entrypoint = {
//         get_dynamic_interst_rates: {
//           address: walletAddress,
//           amount: BigInt(USDAmount * 10 ** 10).toString()
//         }
//       }

//       let tx = await CosmWasmClient.queryContractSmart(CONTRACT_ADDRESS, entrypoint);
//       if (tx == 0) {
//         setArchAmount(USDAmount * 1.5)
//         console.log(ArchAmount)
//       }

//       else {
//         let k = (Math.E) ** ((USDAmount) * tx / 1000)
//         setUSDAmount(k * 1.5 * USDAmount)

//       }





//     }

//   }

//   const fixed_collaterizatoin_value = async () => {
//     if (window.keplr && walletAddress) {
//       const offlineSigner = window.keplr.getOfflineSigner(ChainInfo.chainId);
//       const CosmWasmClient = await SigningArchwayClient.connectWithSigner(ChainInfo.rpc, offlineSigner);
//       const CONTRACT_ADDRESS = import.meta.env.VITE_VAULT_CONTRACT;

//       let entrypoint = {
//         get_fixed_interst_rates: {
//           address: walletAddress

//         }
//       }

//       let tx = await CosmWasmClient.queryContractSmart(CONTRACT_ADDRESS, entrypoint);
//       setArchAmount(tx);
//       console.log(tx);

//     }
//   }


//   const callContract = async () => {
//     if (window.keplr && walletAddress) {

//       const offlineSigner = window.keplr.getOfflineSigner(ChainInfo.chainId);
//       const CosmWasmClient = await SigningArchwayClient.connectWithSigner(ChainInfo.rpc, offlineSigner);
//       const CONTRACT_ADDRESS = import.meta.env.VITE_VAULT_CONTRACT;
//       const TOKEN_CONTRACT = import.meta.env.VITE_TOKEN_CONTRACT;
//       const STAKING_CONTRCAT = import.meta.env.VITE_STAKING_REWARDS_CONTRACT;
//       const STAKING_TOKEN = import.meta.env.VITE_STAKED_TOKEN_CONTRACT;
//       const GOVENANCE_CONTRACT = import.meta.env.VITE_GOVERNANCE_CONTRACT;

//       let entrypoint = {
//         deposit: {
//           amount_out_collateral: BigInt(Math.floor(USDAmount * 10 ** 10)).toString(),
//           amount_in_collateral: BigInt(ArchAmount * 10 ** 18).toString()
//         }
//       }
//       let funds: Coin[] = [{ amount: BigInt((ArchAmount + 0.1) * 10 ** 18).toString(), denom: "aconst" }]
//       let gas: StdFee = {
//         amount: [{
//           amount: "300000000",
//           denom: "aconst"
//         },
//         ],
//         gas: "3000000"
//       }
//       const depositInstruction: ExecuteInstruction = {
//         contractAddress: CONTRACT_ADDRESS,
//         msg: entrypoint,
//         funds
//       }
//       let increase_allowance = {
//         increase_allowance: {
//           spender: CONTRACT_ADDRESS,
//           amount: BigInt(10 ** 25).toString()
//         }
//       }

//       let increase_allowance_part = {
//         increase_allowance: {
//           spender: GOVENANCE_CONTRACT,
//           amount: BigInt(10 ** 25).toString()
//         }
//       }
//       const increaseAllowance: ExecuteInstruction = {
//         contractAddress: TOKEN_CONTRACT,
//         msg: increase_allowance
//       }
//       const increaseAllowanceStakingToken: ExecuteInstruction = {
//         contractAddress: STAKING_TOKEN,
//         msg: increase_allowance_part
//       }

//       const stake_reward = {
//         stake: {
//           amount: BigInt(Math.floor(USDAmount * 10 ** 18)).toString()
//         }
//       }
//       let funds_my: Coin[] = [{ amount: BigInt((0.1) * 10 ** 18).toString(), denom: "aconst" }]
//       const stakingReward: ExecuteInstruction = {
//         contractAddress: STAKING_CONTRCAT,
//         msg: stake_reward,
//         funds: funds_my
//       }


//       const join_dao = {
//         join_dao: {
//           amount: BigInt(USDAmount * 10 ** 18).toString()
//         }
//       }
//       const join_Dao: ExecuteInstruction = {
//         contractAddress: GOVENANCE_CONTRACT,
//         msg: join_dao,
//       }

//       let tx = await CosmWasmClient.executeMultiple(walletAddress, [depositInstruction, increaseAllowance, increaseAllowanceStakingToken, stakingReward , join_Dao], gas);
//       console.log(tx)

//     }
//   }

//   return (
//     <>
//       <Dialog>
//         <DialogTrigger>
//           <Button>Get Loan</Button>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Get a Loan</DialogTitle>
//           </DialogHeader>
//           <Label className="text-muted-foreground" htmlFor="amount" />
//           <Input
//             id="amount"
//             name="amount"
//             placeholder="Enter Loan Amount USD"
//             value={USDAmount}
//             onChange={(e) => setUSDAmount(Number(e.target.value))}
//             type="number"
//           />
//           <Input
//             id="amount"
//             name="amount"
//             placeholder="Your Arch Amount"
//             value={ArchAmount}
//             disabled
//           />
//           <p className="text-xs mt-2 text-muted-foreground">Select the loan type</p>
//           <div className="flex flex-row gap-2">
//             <Button variant="secondary" className="flex-1" onClick={fixed_collaterizatoin_value}>Fixed</Button>
//             <Button variant="secondary" className="flex-1" onClick={dynamic_collaterizatoin_value}>Dynamic</Button>
//           </div>

//           <div className="flex flex-row gap-2">
//             <Input className="flex-1" placeholder="Your wallet Address" value={walletAddress === null ? "" : walletAddress}></Input>
//           </div>

//           <Button onClick={callContract}>Get Loan</Button>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }
const aptosConfig = new AptosConfig({
  network: Network.TESTNET,
});
const aptos = new Aptos(aptosConfig);
const client = createSurfClient(aptos);
export default function GetLoan() {
  const [USDAmount, setUSDAmount] = useState(0)
  const [MOVEAmount, setMoveAmount] = useState(0)
  const { signAndSubmitTransaction, account } = useWallet();
  const { toast } = useToast()
  const { setMUSDAmount } = useMUSDAmountStore()
  const {
    isIdle,
    reset,
    isLoading: submitIsLoading,
    error: submitError,
    submitTransaction,
    data: submitResult,
  } = useSubmitTransaction();



  const dynamic_collaterizatoin_value = async () => {
    if (account?.address) {
      console.log(account.address, USDAmount * 10 ** 6)
      const [tx] = await aptos.view({
        payload: {
          function: `${VAULT_CONTRACT}::Vault::get_dynamic_interest_rate`,
          functionArguments: [account.address, Math.floor(USDAmount * 10 ** 18)],
          typeArguments: []
        }
      })
      console.log(tx)
      if (Number(tx) == 0) {
        setMoveAmount(USDAmount * 1.5)
      }

      else {
        let k = (Math.E) ** ((USDAmount) * Number(tx) / 1000)
        setUSDAmount(k * 1.5 * USDAmount)

      }
    }
  }

  async function getMUSDBalance() {
    if (!account) setMUSDAmount(0)
      console.log("here")
    if (account?.address) {
      console.log("here")
      const resource = await aptos.getAccountResource({
        accountAddress: account?.address,
        resourceType: `0x1::coin::CoinStore<${VAULT_CONTRACT}::Vault::MUSD>`,
      });
      console.log(resource)
      setMUSDAmount(resource.coin.value/10**18)
    }
  }
  useEffect(()=>{
    getMUSDBalance()
  },[account?.address])
    async function deposit() {
      // const transaction: InputTransactionData = {
      //   data: {
      //     function: `${VAULT_CONTRACT}::vault::deposit`,
      //     functionArguments: [MOVEAmount,USDAmount ]
      //   }
      // }
      // try {
      //   // sign and submit transaction to chain
      //   const response = await signAndSubmitTransaction(transaction);
      //   // wait for transaction
      //   toast({
      //     description:`Success!  ${response.hash}`
      //   })
      //   await aptos.waitForTransaction({ transactionHash: response.hash });
      // } catch (error: any) {
      //   console.error(error)
      //   toast({
      //     description: "Failed to Deposit",
      //     variant: "destructive"
      //   })
      // }


      const payload = createEntryPayload(VAULT_ABI, {
        /// @ts-ignore
        function: "deposit",
        /// @ts-ignore
        typeArguments: [],
        /// @ts-ignore
        functionArguments: [Math.floor(MOVEAmount * 10 ** 8), Math.floor(USDAmount * 10 ** 18)]
      });
      const tx = await submitTransaction(payload);
      console.log(tx)
    }

    useEffect(() => {
      const delayDebounceFn = setTimeout(async () => {
        const data = await dataFetch()
        const price = data.data.price;
        if (price) {
          setMoveAmount(USDAmount / (price))
        }
      }, 750)

      return () => clearTimeout(delayDebounceFn)
    }, [USDAmount])


    return (
      <>
        <Dialog>
          <DialogTrigger>
            <Button>Get Loan</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Get a Loan</DialogTitle>
            </DialogHeader>
            <Label className="text-muted-foreground" htmlFor="amount" />
            <Input
              id="amount"
              name="amount"
              placeholder="Enter Loan Amount USD"
              value={USDAmount}
              onChange={(e) => setUSDAmount(Number(e.target.value))}
              type="number"
            />
            <Input
              id="amount"
              name="amount"
              placeholder="Your Arch Amount"
              value={MOVEAmount}
              disabled
            />
            <p className="text-xs mt-2 text-muted-foreground">Select the loan type</p>
            <div className="flex flex-row gap-2">
              <Button variant="secondary" className="flex-1">Fixed</Button>
              <Button variant="secondary" className="flex-1" onClick={dynamic_collaterizatoin_value}>Dynamic</Button>
            </div>

            <div className="flex flex-row gap-2">
              <Input className="flex-1" placeholder="Your wallet Address"></Input>
            </div>

            <Button onClick={deposit}>Apply</Button>
          </DialogContent>
        </Dialog>
      </>
    );
  }

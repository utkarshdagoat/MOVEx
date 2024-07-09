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
// import { useWalletStore } from "@/hooks/useStore";
// import { Window as KeplrWindow } from "@keplr-wallet/types";
// import { SigningArchwayClient, StdFee, Coin } from '@archwayhq/arch3.js';
// import { ChainInfo } from "@/lib/chain";
// const EXCHANGE_RATE_API = import.meta.env.VITE_EXCHANGE_RATE_API
// const dataFetch = async () => {
//   const res = await axios.get(EXCHANGE_RATE_API)
//   const data = await res.data
//   return data
// }

// declare global {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface
//   interface Window extends KeplrWindow { }
// }

// export interface ExecuteInstruction {
//   contractAddress: string;
//   msg: any;
//   funds?: readonly Coin[];
// }

// export default function GetLoan() {
//   const [USDAmount, setUSDAmount] = useState(0)
//   const [ArchAmount, setArchAmount] = useState(0)
//   const { walletAddress } = useWalletStore()

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

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(async () => {
//       const data = await dataFetch()
//       const price = data.data.price;
//       if (price) {
//         setArchAmount(USDAmount / (price * 100))
//       }
//     }, 750)

//     return () => clearTimeout(delayDebounceFn)
//   }, [USDAmount])

//   // const ChainInfo = { chainId: 'constantine-3', chainName: 'Constantine Testnet', rpc: 'https://rpc.constantine.archway.io', rest: 'https://api.constantine.archway.io', stakeCurrency: { coinDenom: 'CONST', coinMinimalDenom: 'aconst', coinDecimals: 18 }, bip44: { coinType: 118 }, bech32Config: { bech32PrefixAccAddr: 'archway', bech32PrefixAccPub: 'archwaypub', bech32PrefixValAddr: 'archwayvaloper', bech32PrefixValPub: 'archwayvaloperpub', bech32PrefixConsAddr: 'archwayvalcons', bech32PrefixConsPub: 'archwayvalconspub', }, currencies: [{ coinDenom: 'CONST', coinMinimalDenom: 'aconst', coinDecimals: 18 }], feeCurrencies: [{ coinDenom: 'CONST', coinMinimalDenom: 'aconst', coinDecimals: 18 }], coinType: 118, gasPriceStep: { low: 0, average: 0.1, high: 0.2 }, features: ['cosmwasm'], };
//   // async function connectKeplrWallet(chainName, chainRpcUrl, chainId) {
//   //   if (typeof window.keplr === 'undefined') {
//   //     console.warn('Keplr wallet not found. Please install Keplr first.');
//   //     return;
//   //   }

//   //   if (typeof window.keplr.experimentalSuggestChain === 'function') {
//   //     try {
//   //       await window.keplr.experimentalSuggestChain({
//   //         chainId: chainId,
//   //         chainName: chainName,
//   //         rpcUrl: chainRpcUrl,
//   //       });
//   //     } catch (error) {
//   //       console.warn('Error suggesting chain:', error);
//   //     }
//   //   }

//   //   // Enable Keplr for the chain
//   //   try {
//   //     await window.keplr.enable(chainId);
//   //     console.log(`Keplr enabled for chain: ${chainName}`);
//   //   } catch (error) {
//   //     console.error('Error enabling Keplr:', error);
//   //     return;
//   //   }
//   //   let offlineSigner;
//   //   try {
//   //     offlineSigner = await window.getOfflineSignerAuto(chainId);
//   //   } catch (error) {
//   //     console.error('Error getting Keplr signer:', error)
//   //     return;
//   //   }
//   //   const CosmWasmClient = await SigningArchwayClient.connectWithSigner(ChainInfo.rpc, offlineSigner);
//   //   const accounts = await offlineSigner.getAccounts();
//   //   const queryHandler = CosmWasmClient.queryContractSmart;
//   //   console.log('Wallet connected', { offlineSigner: offlineSigner, CosmWasmClient: CosmWasmClient, accounts: accounts, chain: ChainInfo, queryHandler: queryHandler, });
//   // }


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


export default function GetLoan() {
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
            placeholder="Enter Loan Amount (USDC)"
          />
          <Input
            id="time"
            placeholder="Enter time period for the loan (say 5 months)"
          />
          <p className="text-xs mt-2 text-muted-foreground">Select the loan type</p>
          <div className="flex flex-row gap-2">
            <Button variant="secondary" className="flex-1">Fixed</Button>
            <Button variant="secondary" className="flex-1">Dynamic</Button>
          </div>

          <div className="flex flex-row gap-2">
            <Input className="flex-1" placeholder="Your wallet Address"></Input>
            {/* <Button variant={'ghost'} size={'icon'}><img src={leapLogo} /></Button> */}
          </div>

          <Button>Apply</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

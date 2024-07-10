import {
  InfoCard,
  InfoCardProps,
} from "@/components/dashboard/commons/info-card";
import AmountDisplay from "./amount-display";
import Heading from "@/components/dashboard/commons/heading";
import { useMUSDAmountStore } from "@/hooks/useStore";
// import { Window as KeplrWindow } from "@keplr-wallet/types";
// import { SigningArchwayClient, StdFee, Coin } from '@archwayhq/arch3.js';
// import { ChainInfo } from "@/lib/chain";
// import { useWalletStore, useMUSDAmountStore, useSMUSDAmountStore, useRepayedStore } from "@/hooks/useStore";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// declare global {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface
//   interface Window extends KeplrWindow { }
// }

// export interface ExecuteInstruction {
//   contractAddress: string;
//   msg: any;
//   funds?: readonly Coin[];
// }


// export default function AmountInfo() {
//   const { walletAddress } = useWalletStore()
//   const [mUSDC, setMUSDC] = useState(0)
//   const [sMUSDC, setMUSDCStaked] = useState(0)
//   const { setMUSDAmount } = useMUSDAmountStore()
//   const { setsMUSDAmount } = useSMUSDAmountStore()
//   const { setRepayed } = useRepayedStore()
//   const callContract = async () => {
//     if (window.keplr && walletAddress) {
//       const offlineSigner = window.keplr.getOfflineSigner(ChainInfo.chainId);
//       const CosmWasmClient = await SigningArchwayClient.connectWithSigner(ChainInfo.rpc, offlineSigner);
//       const CONTRACT_ADDRESS = import.meta.env.VITE_VAULT_CONTRACT;

//       let entrypoint = {
//         get_balance_of: {
//           address: walletAddress
//         }
//       }

//       let tx = await CosmWasmClient.queryContractSmart(CONTRACT_ADDRESS, entrypoint);

//       let entrypoint_repayed = {
//         get_repayed_debt: {
//           address: walletAddress
//         }
//       }
//       let repayed;
//       try {

//         repayed = await CosmWasmClient.queryContractSmart(CONTRACT_ADDRESS, entrypoint_repayed);
//         if (repayed) {

//         }
//       } catch (error) {

//       } finally {
//         if (typeof (repayed) === "number") {
//           console.log(tx)
//           setRepayed(repayed)
//           setMUSDC((tx[1] - repayed) / 10 ** 10)
//           setMUSDAmount((tx[1] - repayed) / 10 ** 10)
//         } else {
//           setMUSDAmount((tx[1]) / 10 ** 10)
//           setMUSDC((tx[1]) / 10 ** 10)
//         }

//       }
//     }
//   }

//   const callBalanceContract = async () => {
//     if (window.keplr && walletAddress) {
//       const offlineSigner = window.keplr.getOfflineSigner(ChainInfo.chainId);
//       const CosmWasmClient = await SigningArchwayClient.connectWithSigner(ChainInfo.rpc, offlineSigner);
//       const CONTRACT_ADDRESS = import.meta.env.VITE_STAKED_TOKEN_CONTRACT;

//       let entrypoint = {
//         balance: {
//           address: walletAddress
//         }
//       }

//       let tx = await CosmWasmClient.queryContractSmart(CONTRACT_ADDRESS, entrypoint);
//       setMUSDCStaked((tx.balance) / 10 ** 18)
//       setsMUSDAmount((tx.balance) / 10 ** 18)
//     }
//   }
//   useEffect(() => {
//     callContract()
//     callBalanceContract()
//   }, [walletAddress])


//   const data: InfoCardProps[] = [
//     {
//       title: "mUSDC Balance",
//       type: "component",
//       data: <AmountDisplay amount={mUSDC} currency="mUSDC" />,
//     },
//     {
//       title: "Rewards",
//       type: "component",
//       data: <AmountDisplay amount={sMUSDC} currency="mosaic" />,
//     },
//   ];

//   return (
//     <div>
//       <Heading>Current Amount</Heading>
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//         {data.map((item, index) => {

//           return (
//             <InfoCard key={index} {...item} />
//           )

//         })}
//       </div>
//     </div>
//   );
// }


export default function AmountInfo() {
  const {mUSDAmount}= useMUSDAmountStore()
  const data: InfoCardProps[] = [
    {
      title: "mUSDC Balance",
      type: "component",
      data: <AmountDisplay amount={mUSDAmount} currency="mUSDC" />,
    },
    {
      title: "Rewards",
      type: "component",
      data: <AmountDisplay amount={0} currency="mosaic" />,
    },
  ];
  return (
    <div>
      <Heading>Current Amount</Heading>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data.map((item, index) => (
          <InfoCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

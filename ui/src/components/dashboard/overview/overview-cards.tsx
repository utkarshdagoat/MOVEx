import {
  InfoCardProps,
  InfoCard,
} from "@/components/dashboard/commons/info-card";
import { useState } from "react";
import Heading from "@/components/dashboard/commons/heading";
import { ChainInfo } from "@/lib/chain";
import { useMUSDAmountStore, useRepayedStore, useSMUSDAmountStore, useWalletStore } from "@/hooks/useStore";



export default function OverviewCards() {
  const [totalAssets, setTotalAssets] = useState("0");
  const [totalRepayments, setTotalRepayments] = useState("1045");
  const [creditScore, setCreditScore] = useState("470");
  const {walletAddress} = useWalletStore()
  const { mUSDAmount } = useMUSDAmountStore()
  const { smUSDAmount} = useSMUSDAmountStore() 
  const { repayed} = useRepayedStore()
  console.log(repayed)
  const data: InfoCardProps[] = [
    {
      title: "Total Assets",
      type: "value",
      unit: "$",
      data: mUSDAmount.toString(),
    },
    {
      title: "Total Repayments",
      type: "value",
      unit: "$",
      data: repayed.toString(),
    },
  ];

  return (
    <div>
      <Heading>Overview</Heading>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {data.map((item, index) => (
          <InfoCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

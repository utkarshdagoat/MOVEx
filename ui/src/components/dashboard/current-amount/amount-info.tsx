import {
  InfoCard,
  InfoCardProps,
} from "@/components/dashboard/commons/info-card";
import AmountDisplay from "./amount-display";
import Heading from "@/components/dashboard/commons/heading";
import { useMUSDAmountStore } from "@/hooks/useStore";
import RedeemCollateralModal from "../loans/redeem-collateral-modal";



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
      data: <AmountDisplay amount={0} currency="MOVEx" />,
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <Heading>Current Amount</Heading>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data.map((item, index) => (
          <InfoCard key={index} {...item} />
        ))}
      </div>
      <RedeemCollateralModal />
    </div>
  );
}

import OverviewCards from "./overview/overview-cards";
import AmountInfo from "./current-amount/amount-info";
import LoansInfo from "./loans/loans-info";
import RedeemCollateralModal from "./loans/redeem-collateral-modal";

export default function OccupiedState() {
  return (
    <>
      <OverviewCards />
      <AmountInfo />
      <LoansInfo />
    </>
  );
}

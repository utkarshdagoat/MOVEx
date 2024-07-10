import NumberTicker from "@/components/ui/number-ticker";
import mosaicToken from "@/assets/tokens/reward-token.svg";
import usdcToken from "@/assets/tokens/musdc-token.svg";

interface AmountDisplayProps {
  amount: number;
  currency: "mUSDC" | "MOVEx";
}

export default function AmountDisplay(props: AmountDisplayProps) {
  return (
    <p className="text-lg md:text-3xl gap-2 inline-flex items-center font-bold text-foreground">
      <img
        src={props.currency == "mUSDC" ? usdcToken : mosaicToken}
        className="w-6 h-6 md:w-10 md:h-10"
      />{" "}
      {props.amount == 0 ? 0 : <NumberTicker value={props.amount} />}
    </p>
  );
}

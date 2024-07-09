import GaugeChart from "react-gauge-chart";

export default function CreditScore({ score }: { score: number }) {
  const percent = score / 1000;
  return (
    <div className="flex flex-col items-center">
      <GaugeChart
        nrOfLevels={4}
        className="max-w-md"
        colors={["#e0e7ff", "#3730a3"]}
        arcWidth={0.3}
        percent={percent}
        needleBaseColor="#312e81"
        needleColor="#4f46e5"
        formatTextValue={(value) => (value as unknown as number) * 10 + " pts"}
      />
      <p className="text-muted-foreground font-medium tracking-wide text-lg">
        You have a{" "}
        <span className="text-primary brightness-110 font-semibold uppercase">
          {percent < 0.25
            ? "poor"
            : percent < 0.5
            ? "below-average"
            : percent < 0.75
            ? "good"
            : "fantastic"}
        </span>{" "}
        reputation
      </p>
    </div>
  );
}

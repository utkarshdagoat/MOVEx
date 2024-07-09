import { Card, CardTitle } from "@/components/ui/card";
import NumberTicker from "@/components/ui/number-ticker";

type InfoCardPropsBase<T extends "value" | "component"> = {
  title: string;
  type: T;
  unit?: T extends "value" ? string : never;
  data: T extends "value" ? string : React.ReactNode;
};

export type InfoCardProps =
  | InfoCardPropsBase<"value">
  | InfoCardPropsBase<"component">;

export function InfoCard(props: InfoCardProps) {
  console.log(props.data)
  return (
    <Card className="flex justify-between items-center md:flex-col md:items-start gap-4 p-4">
      <CardTitle className="text-base text-muted-foreground">
        {props.title}
      </CardTitle>
      <div className="flex flex-col gap-2">
        {props.type === "value" ? (
          <>
          {
            parseInt(props.data) === 0 ? (<>
              <p className="text-lg md:text-3xl font-bold text-foreground">{props.data}{" "}<span className="text-primary">{props.unit}</span></p>
            </>) : (
              <p className="text-lg md:text-3xl tracking-tight font-bold text-foreground"><NumberTicker value={props.data as unknown as number} />  <span className="text-primary">{props.unit}</span></p>
            )
          }
          </>
        ) : (
          props.data
        )}
      </div>
    </Card>
  );
}

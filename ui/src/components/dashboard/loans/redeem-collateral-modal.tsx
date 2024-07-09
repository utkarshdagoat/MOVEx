import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";

export default function RedeemCollateralModal() {
  // TODO: Idhar global state se lele data ya to props pass krwa do ki kya kya lagega.
  const [repayAmount, setRepayAmount] = useState(0.0);
  const [collateralReimbursed, setCollateralReimbursed] = useState(1800);

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"}>Redeem</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Redeem Collateral</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSumbit}>
          <div>
            <Label>Amount $</Label>
            <Input
              type="number"
              placeholder="Repayment amount (in USD)"
              onChange={(e) => setRepayAmount(parseFloat(e.target.value))}
            />
          </div>
          <div className="bg-muted/40 border py-3 px-4 rounded-md flex justify-between">
            <h1 className="text-sm text-muted-foreground font-semibold">
              Collateral Reimbursed
            </h1>
            <div className="text-foreground inline-flex items-center gap-2 text-sm font-semibold">
              {collateralReimbursed} USD
            </div>
          </div>
          <Button type="submit">Redeem</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

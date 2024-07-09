import { Button } from "@/components/ui/button";
import GetLoan from "./get-loan";
import TypingAnimation from "@/components/ui/typing-animation";
import { useUserStore, useWalletStore } from "@/hooks/useStore";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";

export default function DashboardHeader() {
  const { user } = useUserStore();
  const { walletAddress, setWalletAddress } = useWalletStore();
  const { toast } = useToast();
  const navigate = useNavigate();


  return (
    <div className="flex flex-row justify-between">
      <h1 className="text-4xl inline-flex gap-2 text-foreground/80 font-mosaic">
        Dashboard{" "}
        <TypingAnimation
          className="text-primary"
          text={walletAddress === null ? "" : `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`}
          // text={user?.email === undefined ? "" : user.email.split("@")[0]}
        />
      </h1>
      <div className="flex gap-6">
        <WalletSelector /> 
        <Button onClick={()=>navigate("/governance")}>Go To Governance</Button>
        <GetLoan />
      </div>
    </div>
  );
}

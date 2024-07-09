import { Button } from "@/components/ui/button";
import GetLoan from "./get-loan";
import TypingAnimation from "@/components/ui/typing-animation";
import { useUserStore, useWalletStore } from "@/hooks/useStore";
import { ChainInfo } from "@/lib/chain";
import { useToast } from "@/components/ui/use-toast";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}

export default function DashboardHeader() {
  const { user } = useUserStore();
  const { walletAddress, setWalletAddress } = useWalletStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const connectWalletHandle = async () => {
    const chainId = ChainInfo.chainId;
    if (!window.keplr) {
      toast({
        description: "Please install Keplr wallet to proceed",
      });
    } else {
      await window.keplr.enable(chainId);
      const address = await window.keplr.getKey(chainId);
      setWalletAddress(address.bech32Address);
      localStorage.setItem("walletAddress", address.bech32Address);
    }
  };

  useEffect(()=>{
  },[walletAddress])



  return (
    <div className="flex flex-row justify-between">
      <h1 className="text-4xl inline-flex gap-2 text-foreground/80 font-mosaic">
        Hi{" "}
        <TypingAnimation
          className="text-primary"
          text={walletAddress === null ? "" : `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`}
          // text={user?.email === undefined ? "" : user.email.split("@")[0]}
        />
      </h1>
      <div className="flex gap-6">
        <Button  onClick={connectWalletHandle}>{walletAddress === null ? "Connect Wallet" : walletAddress}</Button>
        <Button onClick={()=>navigate("/governance")}>Go To Governance</Button>
        <GetLoan />
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContainerScroll } from "@/components/ui/container-scroll";
import AnimatedTextGradient from "@/components/ui/animated-text-gradient";

import mosaicToken from "@/assets/tokens/reward-token.svg";

export default function Hero() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleGetStartedClick = async () => {
    navigate("/dashboard");
  };
  return (
    <div className="relative">
      <div className="absolute top-0 z-[0] h-screen w-screen bg-background bg-[radial-gradient(ellipse_60%_60%_at_50%_-20%,rgba(250,204,21,0.3),rgba(255,255,255,0))]"></div>
      <section className="relative max-w-full mx-auto z-1">
        <div className="max-w-screen-xl z-10 mx-auto px-4 gap-12 md:px-8">
          <ContainerScroll
            titleComponent={
              <div className="space-y-5 max-w-4xl leading-4 lg:leading-6 mx-auto text-center">
                <h1 className="text-4xl bg-clip-text leading-6 tracking-tight mx-auto md:text-6xl">
                  Don't just hold{" "}
                  <span className="font-bold text-primary">MOVE</span>
                  <br />
                  <AnimatedTextGradient
                    className="font-bold uppercase"
                    text="Leverage it"
                    from="from-primary"
                    via="via-orange-600"
                    to="to-yellow-600"
                  />
                </h1>
                <p className="w-[48ch] text-lg mx-auto text-muted-foreground">
                  Unleash the full potential of Move with{" "}
                  <span className="font-MOVEx font-bold text-primary">
                    MOVEx
                  </span>
                  's leverage. Multiply your returns without tying up more
                  capital.
                </p>

                <Button
                  size={"lg"}
                  variant={"expandIcon"}
                  iconPlacement="right"
                  Icon={ChevronRight}
                  className="rounded-full px-8 py-6"
                  onClick={handleGetStartedClick}
                >
                  Get Started
                </Button>
              </div>
            }
          >
            <img src={mosaicToken} className="w-[60%] mx-auto" alt="" />
          </ContainerScroll>
        </div>
      </section>
    </div>
  );
}

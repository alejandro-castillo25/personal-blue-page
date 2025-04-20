import SpotlightCard from "@/components/ui/SpotLightCard";
import GradientText from "@/components/ui/GradientText";
import { Button } from "@/components/ui/button";
import SplitText from "@/components/ui/SplitText";

import { Play } from "lucide-react";
import { useState } from "react";

export function Main() {
  const [greetDone, setGreetDone] = useState<boolean>(false);

  return (
    <main className="h-full flex sm:flex-row flex-col justify-start items-center p-4 pt-20 overflow-auto">
      <SpotlightCard
        className="sm:min-h-[21rem] h-[50%] min-h-[16rem] w-full sm:min-w-[22rem] sm:w-[50%] flex flex-col bg-background/50 border crystal border-border"
        spotlightColor="rgba(43, 127, 255, 0.3)"
      >
        <h2 className="text-[2rem] font-bold mb-2 text-pretty">
          <SplitText
            text="Hello!"
            delay={150}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            threshold={0.2}
            rootMargin="-50px"
            onLetterAnimationComplete={() => setGreetDone(true)}
          />

          <GradientText
            colors={["#4079ff", "#40f9ff", "#4079ff", "#40f9ff", "#4079ff"]}
            animationSpeed={5}
            showBorder={false}
            className={greetDone ? "name" : "opacity-0"}
          >
            I'm Alejandro
          </GradientText>
        </h2>
        <p className="flex-auto flex items-center"></p>

        <Button className="self-end mt-auto group">
          <Play className="transition group-hover:scale-125 ease-in duration-200" />
          Start
        </Button>
      </SpotlightCard>
      <section className="bg-blue-400/30 h-[45%] sm:min-h-[21rem] min-h-[12rem] w-full grid place-content-center">
        View
      </section>

      <p className="hidden sm:flex copyright text-[0.75rem] opacity-40 absolute bottom-0 right-0 items-center select-none">
        © 2025 Alejandro
      </p>
    </main>
  );
}

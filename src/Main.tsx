import SpotlightCard from "@/components/ui/SpotLightCard";
import GradientText from "@/components/ui/GradientText";
import { Button } from "@/components/ui/button";
import SplitText from "@/components/ui/SplitText";

import { Play, ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { translateTo } from "./util";
import { useAppContext } from "./AppContextProvider";
import Folder from "@/components/ui/Folder";
import Stack from "@/components/ui/Stack";
import { IdCard, CodeXml, FileTerminal, Star } from "lucide-react";

export function Main() {
  const [greetDone, setGreetDone] = useState<boolean>(false);
  const [lang] = useAppContext()!.lang;
  const [page, setPage] = useAppContext()!.page;
  const [sfx] = useAppContext()!.sfx;

  const clickHowl = useRef<Howl>(
    new Howl({
      src: ["/assets/sounds/click.mp3"],
      preload: true,
      rate: 1.0,
      volume: 0.75,
    })
  );

  const imagesPage4 = useRef([
    {
      id: 1,
      img: "/assets/images/jason.png",
    },
    {
      id: 2,
      img: "/assets/images/recordv.jpg",
    },
    {
      id: 3,
      img: "/assets/images/star_bg.png",
    },
  ]);

  const imagesPage5 = useRef([
    {
      id: 1,
      img: "/assets/images/fni.png",
    },
    {
      id: 2,
      img: "/assets/images/uto.png",
    },
  ]);

  const cards = useRef([
    {
      title: "Who Am I?",
      text: "My full name is Alejandro Castillo Bustos. I am currently an engineering student, I live in Bolivia, and my favorite color is blue (surprisingly)",
    },
    {
      title: "What I Do",
      text: "To date, I've become deeply immersed in the programming world. Through the knowledge I've acquired over these past years, I've developed the confidence to tackle significant projects and bring ideas to life",
    },
    {
      title: "Programming Languages",
      text: "The programming languages I have experience with and thoroughly enjoy using for professional purposes are TypeScript, JavaScript, and Rust",
    },
    {
      title: "Projects",
      text: "The projects I've worked on so far aim to showcase my skills in specific areas and explore new technologies that emerge over time",
    },
    {
      title: "Education",
      text: "At the moment, I'm studying engineering, specifically Systems Engineering at U.T.O., and I'm in my third semester",
    },
    {
      title: "What I Like",
      text: "I like to learn something new every day, stay informed about what's happening around me, and always do my best",
    },
  ] as const);

  useEffect(() => {
    setGreetDone(false);
  }, [lang]);

  return (
    <main className="h-full flex sm:flex-row flex-col justify-center items-center p-4 pt-20 overflow-auto md:px-6 lg:px-32 xl:px-64 gap-8 sm:gap-4">
      <SpotlightCard
        className="h-auto min-h-[16rem] w-full sm:min-w-[22rem] flex flex-col bg-background/50 border crystal border-border gap-4 pt-4!"
        spotlightColor="rgba(43, 127, 255, 0.3)"
      >
        <h2 className="text-[2rem] font-bold text-pretty ">
          {page === 0 ? (
            <>
              <SplitText
                key={lang}
                text={translateTo(lang, "Hello!")}
                delay={100}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,50px,0)",
                }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                threshold={0.2}
                rootMargin="-50px"
                onLetterAnimationComplete={() => setGreetDone(true)}
              />
              <GradientText
                colors={["#4079ff", "#40e2ff", "#4079ff", "#40e2ff", "#4079ff"]}
                animationSpeed={6}
                showBorder={false}
                className={greetDone ? "name" : "opacity-0"}
              >
                {translateTo(lang, "I'm Alejandro")}
              </GradientText>
            </>
          ) : (
            <SplitText
              key={page.toString().concat(lang)}
              text={translateTo(lang, cards.current[page - 1].title as any)}
              delay={30}
              animationFrom={{
                opacity: 0,
                transform: "translate3d(0,50px,0)",
              }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              threshold={0.2}
              rootMargin="-50px"
            />
          )}
        </h2>
        <p className="flex-auto flex items-center">
          {translateTo(
            lang,
            page == 0
              ? "Welcome! this is an interactive web page where you can learn about me. To get started simply press the button below"
              : (cards.current[page - 1].text as any)
          )}
          {"."}
        </p>
        <div className="flex flex-row w-full">
          {page > 0 && (
            <Button
              className="self-start mr-auto group"
              onClick={() => {
                if (sfx) clickHowl.current.play();
                setPage((n) => --n);
              }}
            >
              <ArrowLeft className="transition group-hover:scale-125 ease-in duration-200" />
              {translateTo(lang, "Back")}
            </Button>
          )}
          {page === 0 && (
            <Button
              className="self-end ml-auto group"
              onClick={() => {
                if (sfx) clickHowl.current.play();

                setPage((_) => 1);
              }}
            >
              <Play className="transition group-hover:scale-125 ease-in duration-200" />
              {translateTo(lang, "Start")}
            </Button>
          )}
          {page > 0 && page < cards.current.length && (
            <Button
              className="self-end ml-auto group"
              onClick={() => {
                if (sfx) clickHowl.current.play();
                setPage((n) => ++n);
              }}
            >
              {translateTo(lang, "Next")}
              <ArrowRight className="transition group-hover:scale-125 ease-in duration-200" />
            </Button>
          )}
        </div>
      </SpotlightCard>

      <section className="rounded-2xl crystal bg-background/50 h-[45%] sm:min-h-[20rem] min-h-[12rem] w-full grid place-items-center">
        {page === 0 && (
          <CodeXml
            className="size-[70%]"
            color="var(--primary)"
            // strokeWidth={1.5}
          />
        )}
        {page === 1 && (
          <IdCard
            className="size-[70%]"
            color="var(--primary)"
            strokeWidth={1.5}
          />
        )}
        {page === 2 && (
          <FileTerminal
            className="size-[70%]"
            color="var(--primary)"
            strokeWidth={1.5}
          />
        )}
        {page === 3 && (
          <Folder
            size={1.5}
            className=""
            items={[
              <img src="/assets/images/js.png" alt="JavaScript" />,
              <img src="/assets/images/ts.png" alt="TypeScript" />,
              <img
                src="/assets/images/rust.png"
                alt="Rust"
                className="dark:invert-100"
              />,
            ]}
          />
        )}
        {page === 4 && (
          <Stack
            randomRotation={true}
            sensitivity={180}
            sendToBackOnClick={true}
            cardDimensions={{ width: 200, height: 200 }}
            cardsData={imagesPage4.current}
          />
        )}
        {page === 5 && (
          <Stack
            randomRotation={true}
            sensitivity={180}
            sendToBackOnClick={true}
            cardDimensions={{ width: 200, height: 200 }}
            cardsData={imagesPage5.current}
          />
        )}
        {page === 6 && (
          <Star
            className="size-[70%]"
            color="var(--primary)"
            strokeWidth={1.5}
          />
        )}
      </section>

      <p className="copyright text-[0.65rem] opacity-15 absolute bottom-0 right-0 items-center select-none">
        © 2025 Alejandro Castillo
      </p>
    </main>
  );
}

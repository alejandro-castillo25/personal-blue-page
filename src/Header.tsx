import { Button } from "@/components/ui/button";
import {
  AlignJustify,
  Star,
  Sun,
  Moon,
  SunDim,
  Eclipse,
  Headphones,
  HeadphoneOff,
  X,
  Languages,
  Volume2,
  VolumeOff,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { Toggle } from "@/components/ui/toggle";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Howl } from "howler";
import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { getGreeting, Greeting, translateTo } from "./util";
import ReactCountryFlag from "react-country-flag";
import { Lang, Theme, useAppContext } from "./AppContextProvider";

function GetGreetingIcon({ value }: { value: Greeting }) {
  if (value === "Good Morning!")
    return <Sun className="inline size-[1.6rem] mr-3" />;
  else if (value === "Good Afternoon!")
    return <SunDim className="inline size-[1.6rem] mr-3" />;
  else if (value === "Good Evening!")
    return <Moon className="inline size-[1.6rem] mr-3" />;
}

function OptionsContent() {
  const {
    theme: [theme, setTheme],
    lang: [lang, setLang],
    music: [music, setMusic],
    sfx: [sfx, setSfx],
  } = useAppContext()!;

  return (
    <>
      <div className="flex flex-row w-full align-center">
        <p className="flex flex-col justify-center font-semibold text-[0.9rem]">
          {translateTo(lang, "Theme")}:{" "}
        </p>
        <ToggleGroup
          className="ml-auto flex w-[40%]"
          type="single"
          value={theme}
          onValueChange={(value) => {
            if (value.length === 0) return;

            setTheme(value as Theme);
          }}
        >
          <ToggleGroupItem value="dark" className="active:scale-100!">
            <Moon />
          </ToggleGroupItem>
          <ToggleGroupItem value="system" className="active:scale-100!">
            <Eclipse />
          </ToggleGroupItem>
          <ToggleGroupItem value="light" className="active:scale-100!">
            <Sun />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <Label className="flex flex-row w-full align-center">
        <p className="flex flex-col justify-center font-semibold text-[0.9rem]">
          {translateTo(lang, "Language")}:
        </p>
        <Select value={lang} onValueChange={(value) => setLang(value as Lang)}>
          <SelectTrigger className="ml-auto flex w-[40%] active:scale-100!">
            <SelectValue placeholder="Lang" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">
              <ReactCountryFlag
                countryCode="US"
                svg
                style={{
                  width: "1em",
                  height: "1em",
                }}
                title="US"
              />
              {"English"}
            </SelectItem>
            <SelectItem value="es">
              <ReactCountryFlag
                countryCode="ES"
                svg
                style={{
                  width: "1em",
                  height: "1em",
                }}
                title="ES"
              />
              {"Español"}
            </SelectItem>
            <SelectItem value="pt">
              <ReactCountryFlag
                countryCode="PT"
                svg
                style={{
                  width: "1em",
                  height: "1em",
                }}
                title="PT"
              />
              {"Português"}
            </SelectItem>
            <SelectItem value="fr">
              <ReactCountryFlag
                countryCode="FR"
                svg
                style={{
                  width: "1em",
                  height: "1em",
                }}
                title="FR"
              />
              {"Français"}
            </SelectItem>
            <SelectItem value="system">
              <Languages />
              {translateTo(lang, "System")}
            </SelectItem>
          </SelectContent>
        </Select>
      </Label>
      <Label>
        <p className="flex flex-col justify-center font-semibold text-[0.9rem]">
          {translateTo(lang, "Music")}:
        </p>
        <Toggle
          className="ml-auto flex w-[40%]"
          pressed={music}
          onClick={() => setMusic((value) => !value)}
        >
          {music ? <Headphones /> : <HeadphoneOff />}
        </Toggle>
      </Label>
      <Label>
        <p className="flex flex-col justify-center font-semibold text-[0.9rem]">
          {translateTo(lang, "Sound Effects")}:
        </p>
        <Toggle
          className="ml-auto flex w-[40%]"
          pressed={sfx}
          onClick={() => setSfx((value) => !value)}
        >
          {sfx ? <Volume2 /> : <VolumeOff />}
        </Toggle>
      </Label>
    </>
  );
}

const OptionPanelSheet = ({ lang }: { lang: Lang }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button
        variant="header"
        className="w-15 h-15 absolute right-0 hidden sm:grid"
      >
        <AlignJustify className="scale-185 text-foreground" />
      </Button>
    </SheetTrigger>
    <SheetContent className="crystal bg-background/55">
      <SheetHeader>
        <SheetTitle asChild>
          <h2 className="text-[1.35rem] flex flex-row items-center">
            <GetGreetingIcon value={getGreeting()} />
            {translateTo(lang, getGreeting())}
          </h2>
        </SheetTitle>
        <SheetDescription aria-description={undefined}></SheetDescription>
        <div className="flex flex-col gap-5 mt-5">
          <OptionsContent />
        </div>
      </SheetHeader>
    </SheetContent>
  </Sheet>
);

const OptionPanelDrawer = ({ lang }: { lang: Lang }) => (
  <Drawer>
    <DrawerTrigger asChild>
      <Button
        variant="header"
        className="w-15 h-15 absolute right-0 grid sm:hidden"
      >
        <AlignJustify className="scale-185 text-foreground" />
      </Button>
    </DrawerTrigger>
    <DrawerContent className="min-h-[90%] crystal bg-background/55">
      <DrawerHeader>
        <DrawerTitle asChild>
          <h2 className="text-[1.35rem] flex flex-row items-center">
            <GetGreetingIcon value={getGreeting()} />
            {translateTo(lang, getGreeting())}
          </h2>
        </DrawerTitle>
        <DrawerDescription></DrawerDescription>
        <div className="flex flex-col gap-5 mt-5">
          <OptionsContent />
        </div>
      </DrawerHeader>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline" className="w-full">
            <X className="mr-2 inline"/>
            {translateTo(lang, "Close")}
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

export function Header() {
  const [lang] = useAppContext()!.lang;
  const [sfx] = useAppContext()!.sfx;

  const logoSound = useRef<Howl>(
    new Howl({
      src: ["/assets/sounds/shine.mp3"],
      rate: 1.0,
      volume: 1.0,
      preload: true,
    })
  );

  return (
    <header className="h-16 w-full fixed top-0 right-0 flex items-center justify-start crystal bg-background/55 border-b border-border">
      <OptionPanelSheet lang={lang} />
      <OptionPanelDrawer lang={lang} />

      <h1 className="text-[1.25rem] font-bold tracking-wide ml-4 select-none flex items-center text-nowrap">
        <Star
          className="w-[1.65rem] h-[1.65rem] inline mr-4 text-primary transition-transform duration-800 active:rotate-143 active:scale-125 cursor-pointer"
          fill="var(--primary)"
          onClick={() => {
            if (sfx) logoSound.current.play();
          }}
        />
        {translateTo(lang, "My Personal Page")}
      </h1>
    </header>
  );
}

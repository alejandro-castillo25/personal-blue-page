import { Button } from "@/components/ui/button";
import { AlignJustify, Diamond } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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


export function Header() {

  const logoSound = useRef<Howl>(
    new Howl({
      src: ["/assets/sound/scale.mp3"],
      rate: 1.85,
      
      volume: 0.3,
      preload: true
    })
  );
  return (
    <header className="h-16 w-full fixed top-0 right-0 flex items-center justify-start crystal bg-background/55 border-b border-border">
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
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

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
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <h1 className="text-[1.25rem] font-bold tracking-wide ml-4 select-none flex items-center text-nowrap">
        <Diamond
          className="w-[1.65rem] h-[1.65rem] inline mr-4 text-primary transition-transform duration-1000 active:rotate-180 active:scale-125"
          fill="var(--primary)"
          onClick={() => {
            logoSound.current.play();
          }}
        />
        Personal Page
      </h1>
    </header>
  );
}

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { toast } from "sonner";

type AppContextStateProp<T> = [T, React.Dispatch<React.SetStateAction<T>>];
type AppContextRefProp<T> = React.RefObject<T>;

export type Lang = "en" | "es" | "pt" | "fr" | "system";
export type Theme = "dark" | "light" | "system";

interface AppContextProps {
  theme: AppContextStateProp<Theme>;
  lang: AppContextStateProp<Lang>;
  music: AppContextStateProp<boolean>;
  sfx: AppContextStateProp<boolean>;
  page: AppContextStateProp<number>;
  musicHowl: AppContextRefProp<Howl | null>;
}

export const AppContext = createContext<null | AppContextProps>(null);

export const useAppContext = () => useContext(AppContext);

export function AppContextProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) ?? "dark"
  );
  const [lang, setLang] = useState<Lang>(
    (localStorage.getItem("lang") as Lang) ?? "system"
  );
  const [music, setMusic] = useState(
    (localStorage.getItem("music") ?? "false") === "true"
  );
  const [sfx, setSfx] = useState(
    (localStorage.getItem("sfx") ?? "true") === "true"
  );

  const [page, setPage] = useState(0);

  const musicHowl = useRef<Howl | null>(null);

  const keysStack = useRef<Array<string>>([]);

  useEffect(() => {
    localStorage.setItem("theme", theme);

    const actualTheme =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;

    document.documentElement.className = actualTheme;
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const listener = (e: MediaQueryListEvent) => {
      if (theme !== "system") return;

      document.documentElement.className = e.matches ? "dark" : "light";
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("music", String(music));
  }, [music]);

  useEffect(() => {
    localStorage.setItem("sfx", String(sfx));
  }, [sfx]);

  useEffect(() => {
    if (musicHowl.current === null) {
      musicHowl.current = new Howl({
        src: ["/assets/music/chill.mp3"],
        rate: 0.75,
        loop: true,
        volume: 0.9,
        autoplay: true,
        preload: true,
      });
    }
  }, []);

  useEffect(() => {
    if (musicHowl.current === null) return;

    if (!music) musicHowl.current.pause();
    else musicHowl.current.play();
  }, [music]);

  useEffect(() => {
    const ctrl = new AbortController();

    window.addEventListener(
      "keyup",
      (e) => {
        const LIMIT = 15;

        const NOT_ALLOWED = [
          "altgraph",
          "control",
          "shift",
          "enter",
          "dead", //? This is to ignore dead keys :<
          "meta",
          " ",
          "tab",
          "capslock",
          "arrowup",
          "arrowdown",
          "arrowleft",
          "arrowright",
        ] as const;

        const { key: rawKey } = e;
        const key = rawKey.toLowerCase();

        const { current: stack } = keysStack;

        if (stack.length >= LIMIT) stack.shift();

        if (NOT_ALLOWED.includes(key as any)) return;

        stack.push(key);
        console.log(stack);
        

        const showToast = (sentence: string) => {
          toast(sentence);
          stack.length = 0;
        };

        const letters = stack.join("");

        const check = (...words: Array<string>) => {
          for (const word of words) if (letters.endsWith(word.toLowerCase())) return true;

          return false;
        };

        //? We're doing else's too because we don't want to reach everything!
        //? and yes, it's pretty horrible too I know...

        if (check("Luz", "Belen", "Ramirez", "Apaza")) showToast("⭐ Belén");
        else if (check("Valeria")) showToast("😠 Esa Valeria");
        else if (check("Nicol")) showToast("😠 Esa Nicol");
        else if (check("Fernando")) showToast("😠 Esa Fernanda");
        else if (check("Aurora")) showToast("😠 Esa Aurora");
        else if (check("Vanesa")) showToast("😠 Esa Vanesa");
        else if (check("Carlos")) showToast("😠 Ese Carlos");
        else if (check("Elias")) showToast("😠 Ese Elias");
        else if (check("Jairo")) showToast("😠 Ese Jairo");
        else if (check("Tapia")) showToast("😠 Ese Tapia");
        else if (check("Jorge")) showToast("😠 Ese Jorge");
        else if (check("Aron")) showToast("😠 Ese Aron");
        else if (check("Jose")) showToast("😠 Ese José");
        else if (check("Luis")) showToast("😠 Ese Luis");
        else if (check("Jonathan")) showToast("😠 Ese Jonathan");
        else if (check("Ferddy")) showToast("😠 Ese Ferddy");
        else if (check("Lopez")) showToast("😠 Ese Lopez");
        else if (check("Leonardo")) showToast("😠 Ese Leonardo");
        else if (check("Sebastian")) showToast("😠 Ese Sebastián");
        else if (check("JuanPablo")) showToast("😠 Ese Juan Pablo");
        else if (check("Serrudo")) showToast("😠 Ese Serrudo");
        else if (check("Roly")) showToast("😠 Ese Roly");
        else if (check("JavaScript", "TypeScript"))
          showToast("👀 Peak language");
        if (check("PHP")) showToast("🐘 The best language (obviously)");
        else if (check("Rust")) showToast("🦀 Peak language too");
        else if (check("Star", "Estrella")) showToast("⭐ Star");
        else if (check("Blue", "Azul")) showToast("🔷 Blue");
        else if (check("parrot", "firstCommit")) showToast("🦜 Parrot!");
        else if (check("Ferris")) showToast("🦀 Ferris");
        else if (check("RGB")) showToast("🔴🟢🔵 RGB");
        else if (check("Bueno")) showToast("🙂 Seco");
        else if (check("OIIA")) showToast("😺 OIIA OIIA");
        else if (check("seeYouLater")) showToast("🐊 Alligator");
        else if (check("youSnooze")) showToast("😵‍💫 You lose");
        else if (check("knockKnock")) showToast("🤔 Who's there?");
        else if (check("easterEgg")) showToast("🥚 Easter Egg!");
        else if (check("Alejandro", "Jesus", "Castillo", "Bustos"))
          showToast("👀 Soy ese");
      },
      {
        signal: ctrl.signal,
      }
    );

    return () => {
      ctrl.abort();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme: [theme, setTheme],
        lang: [lang, setLang],
        music: [music, setMusic],
        sfx: [sfx, setSfx],
        page: [page, setPage],
        musicHowl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

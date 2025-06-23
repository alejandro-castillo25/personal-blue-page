import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

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
        rate: 0.8,
        loop: true,
        volume: 1.0,
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

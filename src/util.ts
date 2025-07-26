import { Lang } from "./AppContextProvider";

import langJson from "./lang.json";

export type LangJsonType = (typeof langJson)[Exclude<Lang, "system">];
export type Greeting = keyof LangJsonType["greeting"];

export function getGreeting(): Greeting {
  const date: Date = new Date();
  const hours = date.getHours();

  if (hours >= 5 && hours < 12) return "morning";
  else if (hours >= 12 && hours < 18) return "afternoon";
  return "evening";
}

export function translateTo(lang: Lang): LangJsonType {
  if (lang === "system")
    return translateTo(
      (navigator.language.split("-").shift() ?? navigator.language) as Exclude<
        Lang,
        "system"
      >
    );

  if (lang === "es") return langJson.es;
  else if (lang === "pt") return langJson.pt;
  else if (lang === "fr") return langJson.fr;

  
  return langJson.en;
}

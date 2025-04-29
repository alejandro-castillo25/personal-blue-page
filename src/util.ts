import { Lang } from "./AppContextProvider";

import langJson from "./lang.json";

export type Greeting = "Good Morning!" | "Good Afternoon!" | "Good Evening!";

export function getGreeting(): Greeting {
  const date: Date = new Date();
  const hours = date.getHours();

  if (hours >= 5 && hours < 12) return "Good Morning!";
  else if (hours >= 12 && hours < 18) return "Good Afternoon!";
  return "Good Evening!";
}

type LangJsonKeys = keyof (typeof langJson)["es"];

export function translateTo(lang: Lang, value: LangJsonKeys): string {
  if (lang === "es") return langJson.es[value];
  if (lang === "pt") return langJson.pt[value];
  if (lang === "fr") return langJson.fr[value];

  if (lang === "system")
    return translateTo(
      (navigator.language.split("-").shift() ?? navigator.language) as Exclude<
        Lang,
        "system"
      >,
      value
    );

  return value;
}


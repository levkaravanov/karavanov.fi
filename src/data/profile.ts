import type { Locale } from "./locales";

type ProfileCopy = {
  role: string;
  intro: string;
  availability: string;
  portraitAlt: string;
};

export type ProfileLinkKind = "github" | "linkedin" | "threads" | "instagram" | "email";

export type ProfileLink = {
  label: string;
  href: string;
  kind: ProfileLinkKind;
};

export const profile = {
  name: "Lev Karavanov",
  email: "lev@karavanov.fi",
  links: [
    { label: "GitHub", href: "https://github.com/levkaravanov", kind: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/levkaravanov", kind: "linkedin" },
    { label: "Threads", href: "https://www.threads.com/@karavanov_lev", kind: "threads" },
    { label: "Instagram", href: "https://www.instagram.com/karavanov_lev", kind: "instagram" },
    { label: "Email", href: "mailto:lev@karavanov.fi", kind: "email" },
  ] satisfies ProfileLink[],
  copy: {
    en: {
      role: "Software Engineer",
      intro:
        "My name is Lev Karavanov. I live in Espoo, Finland, and study software engineering at Metropolia University of Applied Sciences with a focus on mobile development.",
      availability: "This site is my personal path into the profession: what I study, the projects I build, the tools I use, and how I gradually collect my experience in software development.",
      portraitAlt: "Lev Karavanov portrait",
    },
    fi: {
      role: "Software Engineer",
      intro:
        "Olen Lev Karavanov. Asun Espoossa ja opiskelen software engineering -alaa Metropolia Ammattikorkeakoulussa, painopisteenä mobiilikehitys.",
      availability: "Tämä sivusto kertoo henkilökohtaisesta polustani ammattiin: mitä opiskelen, millaisia projekteja rakennan, mitä työkaluja käytän ja miten kerään vähitellen kokemusta ohjelmistokehityksestä.",
      portraitAlt: "Lev Karavanovin muotokuva",
    },
    ru: {
      role: "Software Engineer",
      intro:
        "Меня зовут Лев Караванов. Я живу в Эспоо и учусь в Университете прикладных наук Metropolia на Software Engineer с уклоном в мобильную разработку.",
      availability: "Этот сайт - мой личный путь в профессию: что я изучаю, какие проекты делаю, какие инструменты использую и как постепенно собираю свой опыт в разработке.",
      portraitAlt: "Портрет Льва Караванова",
    },
  } satisfies Record<Locale, ProfileCopy>,
};

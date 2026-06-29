import type { Locale } from "./locales";

export const dictionary = {
  en: {
    nav: {
      intro: "Intro",
      timeline: "Timeline",
      contact: "Contact",
    },
    actions: {
      openDetails: "Open story",
      openImage: "Open image",
      close: "Close",
      readStory: "Read story",
      relatedProjects: "Related projects",
      contact: "Contact",
    },
    filters: {
      all: "All",
      education: "Education",
      project: "Projects",
      practice: "Work",
      tooling: "Tools",
      milestone: "Milestones",
    },
    sections: {
      timeline: "Timeline",
      timelineIntro: "Education, practice, projects, and tooling live in one timeline so the path stays readable as it grows.",
      contact: "Contact",
    },
    theme: {
      settings: "Settings",
      label: "Theme",
      system: "System",
      light: "Light",
      dark: "Dark",
    },
    accessibility: {
      language: "Language",
      tags: "Technologies and topics",
      timelineFilters: "Timeline filters",
    },
    footer: "2026 · Finland · Software Engineering",
  },
  fi: {
    nav: {
      intro: "Alku",
      timeline: "Aikajana",
      contact: "Yhteys",
    },
    actions: {
      openDetails: "Avaa tarina",
      openImage: "Avaa kuva",
      close: "Sulje",
      readStory: "Lue tarina",
      relatedProjects: "Liittyvät projektit",
      contact: "Yhteys",
    },
    filters: {
      all: "Kaikki",
      education: "Opinnot",
      project: "Projektit",
      practice: "Työ",
      tooling: "Työkalut",
      milestone: "Virstanpylväät",
    },
    sections: {
      timeline: "Aikajana",
      timelineIntro: "Opinnot, harjoittelu, projektit ja työkalut ovat samalla aikajanalla, jotta polku pysyy selkeänä sen kasvaessa.",
      contact: "Yhteys",
    },
    theme: {
      settings: "Asetukset",
      label: "Teema",
      system: "Järjestelmä",
      light: "Vaalea",
      dark: "Tumma",
    },
    accessibility: {
      language: "Kieli",
      tags: "Teknologiat ja aiheet",
      timelineFilters: "Aikajanan suodattimet",
    },
    footer: "2026 · Suomi · Software Engineering",
  },
  ru: {
    nav: {
      intro: "Начало",
      timeline: "Путь",
      contact: "Контакты",
    },
    actions: {
      openDetails: "Открыть историю",
      openImage: "Открыть изображение",
      close: "Закрыть",
      readStory: "Читать историю",
      relatedProjects: "Связанные проекты",
      contact: "Связаться",
    },
    filters: {
      all: "Все",
      education: "Учёба",
      project: "Проекты",
      practice: "Практика",
      tooling: "Инструменты",
      milestone: "Этапы",
    },
    sections: {
      timeline: "Временная шкала",
      timelineIntro: "Учёба, практика, проекты и инструменты собраны в одной линии, чтобы путь оставался понятным по мере роста.",
      contact: "Контакты",
    },
    theme: {
      settings: "Настройки",
      label: "Тема",
      system: "Системная",
      light: "Светлая",
      dark: "Тёмная",
    },
    accessibility: {
      language: "Язык",
      tags: "Технологии и темы",
      timelineFilters: "Фильтры временной шкалы",
    },
    footer: "2026 · Финляндия · Software Engineering",
  },
} satisfies Record<Locale, unknown>;

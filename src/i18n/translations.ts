export const languages = {
	en: "English",
	fr: "Français",
} as const;

export const decorativeLanguages = {
	kr: "한국어",
} as const;

export const languageLinks = {
	...languages,
	...decorativeLanguages,
} as const;

export const defaultLang = "en";

const defineTranslations = <
	TDefault extends Record<string, string>,
	TTranslations extends Record<string, Partial<Record<keyof TDefault, string>>>,
>(
	translations: TTranslations & { en: TDefault },
) => translations;

export const translations = defineTranslations({
	en: {
		"nav.home": "home",
		"nav.about": "about",
		"nav.experiences": "experiences",
		"nav.projects": "projects",
		"nav.now": "now",
		"nav.contact": "contact",

		"hero.name": "lucas martinez",
		"hero.title": "software engineer",
		"hero.tagline": "trying to be the guy you can count on to get things done",
		"hero.location": "south of france",

		"about.title": "about",
		"about.paragraph1":
			"software engineer based in the south of france with a preference for backend. i like solving problems and feeling useful.",
		"about.paragraph2":
			"when not writing code, you can find me running, playing football or padel, gaming, reading, or taking care of my daughter.",

		"experiences.title": "experiences",
		"experiences.graneet.title": "senior software engineer",
		"experiences.graneet.company": "graneet",
		"experiences.graneet.workmode": "remote",
		"experiences.graneet.period": "2024 - present",
		"experiences.graneet.description":
			"building erp tools for construction companies to replace excel chaos with real-time project management.",
		"experiences.lizee.title": "software engineer → lead",
		"experiences.lizee.company": "lizee",
		"experiences.lizee.workmode": "remote",
		"experiences.lizee.period": "2021 – 2024",
		"experiences.lizee.description":
			"managed the logistics platform for circular economy solutions. led a team of 4, helped brands like decathlon or maje launch rental or second hand services.",
		"experiences.mesdocteurs.title": "software engineer → lead",
		"experiences.mesdocteurs.company": "mesdocteurs",
		"experiences.mesdocteurs.workmode": "on site",
		"experiences.mesdocteurs.period": "2018 – 2021",
		"experiences.mesdocteurs.description":
			"built the core telemedicine platform. managed 2 people, shipped 24/7 teleconsultation features.",
		"experiences.sap.title": "junior software engineer",
		"experiences.sap.company": "sap labs france",
		"experiences.sap.workmode": "on site",
		"experiences.sap.period": "2017 – 2018",
		"experiences.sap.description":
			"research work on an information extractor for the c3isp eu cybersecurity project.",

		"education.title": "education",
		"education.polytech.degree": "engineering degree, computer science",
		"education.polytech.school": "polytech nice sophia",
		"education.polytech.period": "2014 – 2017",
		"education.polytech.specialization": "specialized in security",
		"education.iut.degree": "bachelor's degree, computer science",
		"education.iut.school": "iut aix-en-provence",
		"education.iut.period": "2012 – 2014",

		"projects.title": "projects",
		"projects.hilo.title": "hilo",
		"projects.hilo.description":
			"browser extension that explains any highlighted text with AI. select text on a page, get a streamed contextual explanation without leaving the tab.",
		"projects.hilo.link": "visit",
		"projects.dropthing.title": "dropthing",
		"projects.dropthing.description":
			"file and snippet sharing project. mostly a learning playground and an excuse to learn Effect.",
		"projects.dropthing.link": "visit",
		"projects.bara.title": "bara",
		"projects.bara.description":
			"patient and billing management system. built for my partner, mostly a learning project for me to explore technologies.",
		"projects.bara.link": "visit",

		"contact.title": "contact",
		"contact.intro": "feel free to reach out.",
		"contact.email": "email",
		"contact.github": "github",
		"contact.linkedin": "linkedin",

		"footer.copyright": "all rights reserved.",

		"now.title": "now",
		"now.subtitle": "what i'm currently working on",
		"now.lastUpdated": "last updated",
		"now.lastUpdatedAt": "may 2026",
		"now.work.title": "work",
		"now.work.content": "building new features at graneet",
		"now.learning.title": "learning",
		"now.learning.content": "Effect",
		"now.stack.title": "stack",
		"now.stack.content": "typescript, react, nestjs, postgresql",
		"now.reading.title": "reading",
		"now.reading.content": "slam dunk, the will of the many",
		"now.projects.title": "side projects",
		"now.projects.content":
			"hilo currently, dropthing and bara from time to time",
		"now.personal.title": "personal",
		"now.personal.content":
			"recovering from a knee injury, soon training for a race in marseille (21km, 500m d+)",
		"now.inspired.title": "inspired by",
	},
	fr: {
		"nav.home": "accueil",
		"nav.about": "à propos",
		"nav.experiences": "expériences",
		"nav.projects": "projets",
		"nav.now": "now",
		"nav.contact": "contact",

		"hero.name": "lucas martinez",
		"hero.title": "ingénieur logiciel",
		"hero.tagline":
			"j'essaie d'être la personne sur qui on peut compter pour faire avancer les choses",
		"hero.location": "sud de la france",

		"about.title": "à propos",
		"about.paragraph1":
			"software engineer basé dans le sud de la france avec une préférence pour le backend. j'aime résoudre des problèmes et me sentir utile.",
		"about.paragraph2":
			"quand je ne code pas, tu pourras me trouver en train de courir, jouer au foot ou au padel, aux jeux vidéo, lire ou m'occuper de ma fille.",

		"experiences.title": "expériences",
		"experiences.graneet.title": "senior software engineer",
		"experiences.graneet.company": "graneet",
		"experiences.graneet.workmode": "télétravail",
		"experiences.graneet.period": "2024 - aujourd'hui",
		"experiences.graneet.description":
			"construction d'un logiciel de gestion pour les entreprises du bâtiment afin de remplacer le chaos excel par de la gestion de projet en temps réel.",
		"experiences.lizee.title": "software engineer → lead",
		"experiences.lizee.company": "lizee",
		"experiences.lizee.workmode": "télétravail",
		"experiences.lizee.period": "2021 – 2024",
		"experiences.lizee.description":
			"gestion de la plateforme logistique pour des solutions d'économie circulaire. management de 4 personnes, accompagnement de marques comme decathlon, maje pour lancer leurs services de location ou de seconde main.",
		"experiences.mesdocteurs.title": "software engineer → lead",
		"experiences.mesdocteurs.company": "mesdocteurs",
		"experiences.mesdocteurs.workmode": "sur site",
		"experiences.mesdocteurs.period": "2018 – 2021",
		"experiences.mesdocteurs.description":
			"construction de la plateforme de télémédecine principale. management de 2 personnes, livraison de fonctionnalités de téléconsultation 24/7.",
		"experiences.sap.title": "junior software engineer",
		"experiences.sap.company": "sap labs france",
		"experiences.sap.workmode": "sur site",
		"experiences.sap.period": "2017 – 2018",
		"experiences.sap.description":
			"travail de recherche sur un extracteur d'information pour le projet européen de cybersécurité c3isp.",

		"education.title": "formation",
		"education.polytech.degree": "diplôme d'ingénieur, informatique",
		"education.polytech.school": "polytech nice sophia",
		"education.polytech.period": "2014 – 2017",
		"education.polytech.specialization": "spécialisé en sécurité",
		"education.iut.degree": "dut, informatique",
		"education.iut.school": "iut aix-en-provence",
		"education.iut.period": "2012 – 2014",

		"projects.title": "projets",
		"projects.hilo.title": "hilo",
		"projects.hilo.description":
			"extension navigateur qui explique tout texte surligné avec de l'IA. sélectionnez du texte et obtenez une explication contextuelle en streaming sans quitter l'onglet.",
		"projects.hilo.link": "visiter",
		"projects.dropthing.title": "dropthing",
		"projects.dropthing.description":
			"projet pour partager des fichiers, des snippets, etc. surtout un projet d'apprentissage et un prétexte pour apprendre Effect.",
		"projects.dropthing.link": "visiter",
		"projects.bara.title": "bara",
		"projects.bara.description":
			"système de gestion de patientèle et de facturation. créé pour ma compagne, principalement un projet pédagogique pour explorer des techno",
		"projects.bara.link": "visiter",

		"contact.title": "contact",
		"contact.intro": "n'hésitez pas à me contacter.",
		"contact.email": "email",
		"contact.github": "github",
		"contact.linkedin": "linkedin",

		"footer.copyright": "tous droits réservés.",
	},
} as const);

export type TranslationKey = keyof typeof translations.en;
export type Language = keyof typeof languages;
export type LanguageLink = keyof typeof languageLinks;

export function useTranslations(lang: Language = defaultLang) {
	return function t(key: TranslationKey): string {
		const langTranslations = translations[lang] as Record<string, string>;
		const defaultTranslations = translations[defaultLang] as Record<
			string,
			string
		>;
		return langTranslations[key] || defaultTranslations[key];
	};
}

export function isLanguage(value: string): value is Language {
	return value in languages;
}

export function getLangFromUrl(url: URL): Language {
	const [, lang] = url.pathname.split("/");
	if (isLanguage(lang)) return lang;
	return defaultLang;
}

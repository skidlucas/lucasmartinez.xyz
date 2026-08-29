import type { TranslationKey, useTranslations } from "../i18n/translations";

type Translator = ReturnType<typeof useTranslations>;

type LocalizedFields<TField extends string> = Record<TField, TranslationKey>;

export const skills = [
	"javascript",
	"typescript",
	"nestjs",
	"react",
	"postgresql",
	"aws",
	"git",
	"datadog",
	"ci/cd",
] as const;

const experiences = [
	{
		id: "graneet",
		tags: ["nestjs", "react", "typescript", "postgresql", "aws", "ci/cd"],
		copy: {
			title: "experiences.graneet.title",
			company: "experiences.graneet.company",
			workmode: "experiences.graneet.workmode",
			period: "experiences.graneet.period",
			description: "experiences.graneet.description",
		},
	},
	{
		id: "lizee",
		tags: ["nestjs", "react", "typescript", "postgresql", "ci/cd"],
		copy: {
			title: "experiences.lizee.title",
			company: "experiences.lizee.company",
			workmode: "experiences.lizee.workmode",
			period: "experiences.lizee.period",
			description: "experiences.lizee.description",
		},
	},
	{
		id: "mesdocteurs",
		tags: ["angular", "nodejs", "postgresql", "ci/cd"],
		copy: {
			title: "experiences.mesdocteurs.title",
			company: "experiences.mesdocteurs.company",
			workmode: "experiences.mesdocteurs.workmode",
			period: "experiences.mesdocteurs.period",
			description: "experiences.mesdocteurs.description",
		},
	},
	{
		id: "sap",
		tags: ["python", "research"],
		copy: {
			title: "experiences.sap.title",
			company: "experiences.sap.company",
			workmode: "experiences.sap.workmode",
			period: "experiences.sap.period",
			description: "experiences.sap.description",
		},
	},
] as const satisfies ReadonlyArray<{
	id: string;
	tags: readonly string[];
	copy: LocalizedFields<
		"title" | "company" | "workmode" | "period" | "description"
	>;
}>;

export function getExperiences(t: Translator) {
	return experiences.map(({ copy, ...experience }) => ({
		...experience,
		title: t(copy.title),
		company: t(copy.company),
		workmode: t(copy.workmode),
		period: t(copy.period),
		description: t(copy.description),
	}));
}

const education = [
	{
		id: "polytech",
		copy: {
			degree: "education.polytech.degree",
			school: "education.polytech.school",
			period: "education.polytech.period",
			specialization: "education.polytech.specialization",
		},
	},
	{
		id: "iut",
		copy: {
			degree: "education.iut.degree",
			school: "education.iut.school",
			period: "education.iut.period",
		},
	},
] as const satisfies ReadonlyArray<{
	id: string;
	copy: LocalizedFields<"degree" | "school" | "period"> &
		Partial<LocalizedFields<"specialization">>;
}>;

export function getEducation(t: Translator) {
	return education.map(({ copy, ...item }) => ({
		...item,
		degree: t(copy.degree),
		school: t(copy.school),
		period: t(copy.period),
		specialization:
			"specialization" in copy ? t(copy.specialization) : undefined,
	}));
}

const projects = [
	{
		id: "pasta",
		tags: ["swift", "swiftui", "macos", "sqlite"],
		copy: {
			title: "projects.pasta.title",
			description: "projects.pasta.description",
		},
	},
	{
		id: "re7",
		tags: [
			"effect",
			"typescript",
			"tanstack start",
			"cloudflare workers",
			"d1",
		],
		link: "https://re7.mtnz.app",
		copy: {
			title: "projects.re7.title",
			description: "projects.re7.description",
			linkLabel: "projects.re7.link",
		},
	},
	{
		id: "hilo",
		tags: [
			"effect",
			"typescript",
			"cloudflare workers",
			"solidjs",
			"browser extension",
		],
		link: "https://hiloapp.dev",
		copy: {
			title: "projects.hilo.title",
			description: "projects.hilo.description",
			linkLabel: "projects.hilo.link",
		},
	},
	{
		id: "dropthing",
		tags: ["effect", "typescript", "hono", "coolify"],
		link: "https://dropthing.lukapps.fr",
		copy: {
			title: "projects.dropthing.title",
			description: "projects.dropthing.description",
			linkLabel: "projects.dropthing.link",
		},
	},
	{
		id: "bara",
		tags: ["react", "nestjs", "typescript", "postgresql", "coolify"],
		link: "https://bara.lukapps.fr",
		copy: {
			title: "projects.bara.title",
			description: "projects.bara.description",
			linkLabel: "projects.bara.link",
		},
	},
] as const satisfies ReadonlyArray<{
	id: string;
	tags: readonly string[];
	link?: string;
	copy: LocalizedFields<"title" | "description"> &
		Partial<LocalizedFields<"linkLabel">>;
}>;

export function getProjects(t: Translator) {
	return projects.map(({ copy, ...project }) => ({
		...project,
		link: "link" in project ? project.link : undefined,
		title: t(copy.title),
		description: t(copy.description),
		linkLabel: "linkLabel" in copy ? t(copy.linkLabel) : undefined,
	}));
}

export function getContactLinks(t: Translator) {
	return [
		{ label: t("contact.email"), url: "mailto:lucasmartinez.it@gmail.com" },
		{ label: t("contact.github"), url: "https://github.com/skidlucas" },
		{
			label: t("contact.linkedin"),
			url: "https://www.linkedin.com/in/lucas-martinez-462336a7",
		},
	];
}

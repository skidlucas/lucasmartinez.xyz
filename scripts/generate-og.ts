// One-off generator for public/og.png (1200x630 Open Graph image).
// Run: bun scripts/generate-og.ts
// Uses `sharp` (available transitively through astro) and `opentype.js`.
import { writeFile } from "node:fs/promises";
import opentype from "opentype.js";
import sharp from "sharp";

// sharp ignores fonts that aren't installed system-wide, so the text is
// converted to SVG paths instead: the output doesn't depend on the machine.
async function loadJetBrainsMono() {
	const css = await fetch(
		"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700",
	).then((res) => res.text());
	const fonts = await Promise.all(
		[...css.matchAll(/url\((https:[^)]+\.ttf)\)/g)].map(async ([, url]) =>
			opentype.parse(await fetch(url).then((res) => res.arrayBuffer())),
		),
	);
	const byWeight = (weight: number) => {
		const font = fonts.find((f) => f.tables.os2.usWeightClass === weight);
		if (!font) throw new Error(`JetBrains Mono ${weight} not found`);
		return font;
	};
	return { regular: byWeight(400), bold: byWeight(700) };
}

const { regular, bold } = await loadJetBrainsMono();

function text(
	font: opentype.Font,
	value: string,
	{ x, y, size, fill, letterSpacing = 0 }: { x: number; y: number; size: number; fill: string; letterSpacing?: number },
) {
	const path = font.getPath(value, x, y, size, { letterSpacing });
	return `<path d="${path.toPathData(2)}" fill="${fill}" />`;
}

const width = 1200;
const height = 630;

// Mirrors the home hero: name, role, blinking-cursor block.
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
	<rect width="100%" height="100%" fill="#fafaf9" />
	${text(bold, "lucas martinez", { x: 120, y: 290, size: 96, fill: "#0a0a0a", letterSpacing: -0.05 })}
	${text(regular, "software engineer", { x: 120, y: 350, size: 30, fill: "#6b6b6b" })}
	<rect x="120" y="392" width="16" height="34" fill="#0a0a0a" />
	${text(regular, "lucasmartinez.xyz", { x: 120, y: 530, size: 22, fill: "#6b6b6b" })}
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
await writeFile("public/og.png", png);
console.log("wrote public/og.png");

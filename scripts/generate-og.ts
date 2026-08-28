// One-off generator for public/og.png (1200x630 Open Graph image).
// Run: bun scripts/generate-og.ts
// Uses `sharp`, which is available transitively through astro.
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const width = 1200;
const height = 630;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
	<rect width="100%" height="100%" fill="#ffffff" />
	<g font-family="'Courier New', Courier, monospace" text-anchor="middle">
		<text x="600" y="290" font-size="88" fill="#0a0a0a" letter-spacing="-2">lucas martinez</text>
		<text x="600" y="360" font-size="34" fill="#666666">software engineer</text>
		<text x="600" y="560" font-size="22" fill="#666666">lucasmartinez.xyz</text>
	</g>
	<rect x="60" y="60" width="1080" height="510" fill="none" stroke="#e5e5e5" stroke-width="2" />
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
await writeFile("public/og.png", png);
console.log("wrote public/og.png");

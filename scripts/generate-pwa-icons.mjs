import sharp from "sharp";
import pngToIco from "png-to-ico";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const source = path.join(root, "public", "logo.png");
const iconsDir = path.join(root, "public", "icons");
const brandColor = "#2563eb";

async function squareWithPadding(size, { background = { r: 255, g: 255, b: 255, alpha: 0 }, paddingRatio = 0 } = {}) {
  const inner = Math.round(size * (1 - paddingRatio * 2));
  const resized = await sharp(source)
    .resize(inner, inner, { fit: "contain", background })
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background },
  })
    .composite([{ input: resized, gravity: "center" }])
    .png()
    .toBuffer();
}

async function main() {
  await mkdir(iconsDir, { recursive: true });

  const icon192 = await squareWithPadding(192);
  await writeFile(path.join(iconsDir, "icon-192.png"), icon192);

  const icon512 = await squareWithPadding(512);
  await writeFile(path.join(iconsDir, "icon-512.png"), icon512);

  const maskable512 = await squareWithPadding(512, { paddingRatio: 0.1 });
  await writeFile(path.join(iconsDir, "icon-maskable-512.png"), maskable512);

  const appleTouch = await squareWithPadding(180, {
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  });
  await writeFile(path.join(iconsDir, "apple-touch-icon.png"), appleTouch);

  const favicon32 = await squareWithPadding(32);
  await writeFile(path.join(iconsDir, "favicon-32.png"), favicon32);

  const favicon16 = await squareWithPadding(16);
  await writeFile(path.join(iconsDir, "favicon-16.png"), favicon16);

  const ico = await pngToIco([
    path.join(iconsDir, "favicon-16.png"),
    path.join(iconsDir, "favicon-32.png"),
  ]);
  await writeFile(path.join(root, "public", "favicon.ico"), ico);

  console.log("PWA icons generated in public/icons/ and public/favicon.ico");
  console.log(`Brand color reference: ${brandColor}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

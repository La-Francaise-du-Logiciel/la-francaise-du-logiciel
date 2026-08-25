/**
 * Builds the Open Graph card from the brand banner.
 *
 * Run with `node scripts/generate-og-image.mjs`; the PNG it writes is
 * committed, so a deploy never depends on sharp being able to rasterise an
 * SVG. Re-run it when public/brand/lfl-banner-light.svg changes.
 *
 * One image covers both languages: the banner is the company's name, which
 * is a proper noun and reads the same in French and in English.
 */
import { readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

/* What every scraper expects, and what Twitter's summary_large_image wants. */
const WIDTH = 1200
const HEIGHT = 630

/* The banner's own background, so it sits on the card without a seam. */
const BACKGROUND = '#FAF8F4'

/* Leaves the card breathing room rather than filling it edge to edge. */
const BANNER_WIDTH = 1040

const banner = await readFile(new URL('../public/brand/lfl-banner-light.svg', import.meta.url))
const rendered = await sharp(banner, { density: 300 })
  .resize({ width: BANNER_WIDTH })
  .png()
  .toBuffer()

const { height } = await sharp(rendered).metadata()

const card = await sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 4,
    background: BACKGROUND,
  },
})
  .composite([
    {
      input: rendered,
      left: Math.round((WIDTH - BANNER_WIDTH) / 2),
      top: Math.round((HEIGHT - height) / 2),
    },
  ])
  .png({ compressionLevel: 9 })
  .toBuffer()

const target = new URL('../public/og.png', import.meta.url)
await writeFile(target, card)
console.log(`${target.pathname}: ${WIDTH}x${HEIGHT}, ${(card.length / 1024).toFixed(1)} kB`)

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

async function processAllFrames() {
  const dir = 'public/FINAL PNG';
  console.log('Starting content-aware watermark removal across all 300 frames...');
  const startTime = Date.now();

  // Watermark region bounds in 1280x720 frame coordinates
  const x1 = 1080;
  const x2 = 1215;
  const y1 = 550;
  const y2 = 719;
  const feather = 16; // 16px soft feathering

  for (let i = 1; i <= 300; i++) {
    const pad = String(i).padStart(3, '0');
    const filePath = path.join(dir, `ezgif-frame-${pad}.png`);

    const image = sharp(filePath);
    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    const getPixel = (x, y) => {
      const cx = Math.max(0, Math.min(width - 1, Math.round(x)));
      const cy = Math.max(0, Math.min(height - 1, Math.round(y)));
      const idx = (cy * width + cx) * channels;
      return [data[idx], data[idx + 1], data[idx + 2]];
    };

    const newData = Buffer.from(data);

    const setPixel = (x, y, r, g, b) => {
      const idx = (y * width + x) * channels;
      newData[idx] = Math.max(0, Math.min(255, Math.round(r)));
      newData[idx + 1] = Math.max(0, Math.min(255, Math.round(g)));
      newData[idx + 2] = Math.max(0, Math.min(255, Math.round(b)));
    };

    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        const tx = (x - x1) / (x2 - x1);
        const leftPixel = getPixel(x1 - 6, y);
        const rightPixel = getPixel(x2 + 6, y);

        const rHoriz = leftPixel[0] + tx * (rightPixel[0] - leftPixel[0]);
        const gHoriz = leftPixel[1] + tx * (rightPixel[1] - leftPixel[1]);
        const bHoriz = leftPixel[2] + tx * (rightPixel[2] - leftPixel[2]);

        const ty = (y - y1) / (y2 - y1);
        const topPixel = getPixel(x, y1 - 6);
        const bottomPixel = getPixel(x, Math.min(height - 1, y2 + 1));

        const rVert = topPixel[0] + ty * (bottomPixel[0] - topPixel[0]);
        const gVert = topPixel[1] + ty * (bottomPixel[1] - topPixel[1]);
        const bVert = topPixel[2] + ty * (bottomPixel[2] - topPixel[2]);

        const edgeDistX = Math.min(x - x1, x2 - x);
        const edgeDistY = Math.min(y - y1, y2 - y);
        const minEdgeDist = Math.min(edgeDistX, edgeDistY);
        const blendFactor = Math.min(1.0, minEdgeDist / feather);

        const interpR = rHoriz * 0.82 + rVert * 0.18;
        const interpG = gHoriz * 0.82 + gVert * 0.18;
        const interpB = bHoriz * 0.82 + bVert * 0.18;

        const orig = getPixel(x, y);
        const finalR = orig[0] * (1 - blendFactor) + interpR * blendFactor;
        const finalG = orig[1] * (1 - blendFactor) + interpG * blendFactor;
        const finalB = orig[2] * (1 - blendFactor) + interpB * blendFactor;

        setPixel(x, y, finalR, finalG, finalB);
      }
    }

    const tempPath = path.join(dir, `ezgif-frame-${pad}.tmp.png`);
    await sharp(newData, { raw: { width, height, channels } })
      .png({ compressionLevel: 7 })
      .toFile(tempPath);

    await fs.rename(tempPath, filePath);

    if (i % 50 === 0 || i === 300) {
      console.log(`Processed ${i}/300 frames...`);
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Successfully completed pixel-level watermark removal across all 300 frames in ${duration}s!`);
}

processAllFrames().catch(err => {
  console.error('Error processing frames:', err);
  process.exit(1);
});

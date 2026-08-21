import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function repairFrame(inputPath, outputPath) {
  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Watermark zone bounds
  const x1 = 1085;
  const x2 = 1210;
  const y1 = 560;
  const y2 = 719;

  const getPixel = (x, y) => {
    const clampedX = Math.max(0, Math.min(width - 1, Math.round(x)));
    const clampedY = Math.max(0, Math.min(height - 1, Math.round(y)));
    const idx = (clampedY * width + clampedX) * channels;
    return [data[idx], data[idx + 1], data[idx + 2]];
  };

  const newData = Buffer.from(data);

  const setPixel = (x, y, r, g, b) => {
    const idx = (y * width + x) * channels;
    newData[idx] = Math.max(0, Math.min(255, Math.round(r)));
    newData[idx + 1] = Math.max(0, Math.min(255, Math.round(g)));
    newData[idx + 2] = Math.max(0, Math.min(255, Math.round(b)));
  };

  // Process watermark region
  for (let y = y1; y <= y2; y++) {
    for (let x = x1; x <= x2; x++) {
      // Calculate normalized horizontal t in [0, 1]
      const tx = (x - x1) / (x2 - x1);

      // Sample clean left and right pixels
      const leftPixel = getPixel(x1 - 5, y);
      const rightPixel = getPixel(x2 + 5, y);

      // Horizontal linear interpolation
      const rHoriz = leftPixel[0] + tx * (rightPixel[0] - leftPixel[0]);
      const gHoriz = leftPixel[1] + tx * (rightPixel[1] - leftPixel[1]);
      const bHoriz = leftPixel[2] + tx * (rightPixel[2] - leftPixel[2]);

      // Calculate normalized vertical ty in [0, 1]
      const ty = (y - y1) / (y2 - y1);
      const topPixel = getPixel(x, y1 - 5);
      const bottomPixel = getPixel(x, Math.min(height - 1, y2 + 1));

      const rVert = topPixel[0] + ty * (bottomPixel[0] - topPixel[0]);
      const gVert = topPixel[1] + ty * (bottomPixel[1] - topPixel[1]);
      const bVert = topPixel[2] + ty * (bottomPixel[2] - topPixel[2]);

      // Feathering edge blend (smooth step near border so transition into untouched pixels is 100% invisible)
      const edgeDistanceX = Math.min(x - x1, x2 - x);
      const edgeDistanceY = Math.min(y - y1, y2 - y);
      const minEdgeDist = Math.min(edgeDistanceX, edgeDistanceY);
      const blendFactor = Math.min(1.0, minEdgeDist / 12); // 12px feather blend zone

      // Blend 80% horizontal, 20% vertical interpolation for smooth radial background match
      const interpR = rHoriz * 0.8 + rVert * 0.2;
      const interpG = gHoriz * 0.8 + gVert * 0.2;
      const interpB = bHoriz * 0.8 + bVert * 0.2;

      const orig = getPixel(x, y);
      const finalR = orig[0] * (1 - blendFactor) + interpR * blendFactor;
      const finalG = orig[1] * (1 - blendFactor) + interpG * blendFactor;
      const finalB = orig[2] * (1 - blendFactor) + interpB * blendFactor;

      setPixel(x, y, finalR, finalG, finalB);
    }
  }

  await sharp(newData, {
    raw: { width, height, channels }
  })
  .png({ compressionLevel: 8 })
  .toFile(outputPath);
}

repairFrame('public/FINAL PNG/ezgif-frame-001.png', 'public/FINAL PNG/test-repaired-001.png')
  .then(() => console.log('Successfully repaired frame 001!'))
  .catch(err => console.error(err));

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, '../public/logo.png');

function toIco(images) {
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0);     // Reserved
    header.writeUInt16LE(1, 2);     // Type 1 (ICO)
    header.writeUInt16LE(images.length, 4); // Number of images

    const dir = Buffer.alloc(16 * images.length);
    let offset = 6 + (16 * images.length);

    images.forEach((img, idx) => {
        const entryOffset = idx * 16;
        dir.writeUInt8(img.size >= 256 ? 0 : img.size, entryOffset + 0);  // Width
        dir.writeUInt8(img.size >= 256 ? 0 : img.size, entryOffset + 1);  // Height
        dir.writeUInt8(0, entryOffset + 2);                               // Color count
        dir.writeUInt8(0, entryOffset + 3);                               // Reserved
        dir.writeUInt16LE(1, entryOffset + 4);                            // Color planes
        dir.writeUInt16LE(32, entryOffset + 6);                           // Bits per pixel
        dir.writeUInt32LE(img.buf.length, entryOffset + 8);               // Size
        dir.writeUInt32LE(offset, entryOffset + 12);                      // Offset
        offset += img.buf.length;
    });

    return Buffer.concat([header, dir, ...images.map(img => img.buf)]);
}

async function run() {
    try {
        if (!fs.existsSync(sourcePath)) {
            console.error(`Source logo file not found at: ${sourcePath}`);
            return;
        }

        console.log(`Loading master logo from: ${sourcePath}`);
        // Trim transparent borders, add 5% padding around circular badge
        const trimmedBuffer = await sharp(sourcePath).trim().toBuffer();
        const trimmedMeta = await sharp(trimmedBuffer).metadata();
        const maxDim = Math.max(trimmedMeta.width, trimmedMeta.height);
        const padding = Math.round(maxDim * 0.05);
        const paddedDim = maxDim + (padding * 2);

        const squareBuffer = await sharp(trimmedBuffer)
            .resize(maxDim, maxDim, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .extend({
                top: padding,
                bottom: padding,
                left: padding,
                right: padding,
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .png()
            .toBuffer();

        const publicDir = path.join(__dirname, '../public');
        const appDir = path.join(__dirname, '../src/app');
        const deployPublicDir = path.join(__dirname, '../deploy/public');

        const targets = [
            { name: 'favicon-16x16.png', size: 16, dirs: [publicDir, deployPublicDir] },
            { name: 'favicon-32x32.png', size: 32, dirs: [publicDir, deployPublicDir] },
            { name: 'apple-touch-icon.png', size: 180, dirs: [publicDir, deployPublicDir] },
            { name: 'android-chrome-192x192.png', size: 192, dirs: [publicDir, deployPublicDir] },
            { name: 'android-chrome-512x512.png', size: 512, dirs: [publicDir, deployPublicDir] },
            { name: 'icon.png', size: 512, dirs: [appDir] },
            { name: 'apple-icon.png', size: 180, dirs: [appDir] }
        ];

        // 1. Generate PNG targets
        for (const target of targets) {
            const pngBuf = await sharp(squareBuffer)
                .resize(target.size, target.size, {
                    fit: 'contain',
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                })
                .png()
                .toBuffer();

            for (const dir of target.dirs) {
                if (fs.existsSync(dir)) {
                    fs.writeFileSync(path.join(dir, target.name), pngBuf);
                    console.log(`Generated ${target.name} (${target.size}x${target.size}) in ${path.relative(__dirname, dir)}/`);
                }
            }
        }

        // 2. Generate multi-resolution favicon.ico (16, 32, 48)
        const ico16 = await sharp(squareBuffer).resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
        const ico32 = await sharp(squareBuffer).resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
        const ico48 = await sharp(squareBuffer).resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();

        const icoBuffer = toIco([
            { size: 16, buf: ico16 },
            { size: 32, buf: ico32 },
            { size: 48, buf: ico48 }
        ]);

        const icoDirs = [publicDir, appDir, deployPublicDir];
        for (const dir of icoDirs) {
            if (fs.existsSync(dir)) {
                fs.writeFileSync(path.join(dir, 'favicon.ico'), icoBuffer);
                console.log(`Generated favicon.ico (16/32/48 multi-res) in ${path.relative(__dirname, dir)}/`);
            }
        }

        console.log('All favicon and App Router icon assets generated successfully from high-res logo.png!');
    } catch (error) {
        console.error('Error generating favicons:', error);
    }
}

run();

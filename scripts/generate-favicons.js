const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, '../public/favicon-16x16.png');

const targets = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 }
];

// Helper to convert a PNG buffer to a standard 1-image ICO file format
function toIco(pngBuffer, size) {
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0);     // Reserved
    header.writeUInt16LE(1, 2);     // Type 1 (ICO)
    header.writeUInt16LE(1, 4);     // Number of images (1)

    const dirEntry = Buffer.alloc(16);
    dirEntry.writeUInt8(size, 0);   // Width
    dirEntry.writeUInt8(size, 1);   // Height
    dirEntry.writeUInt8(0, 2);      // Color count (0 for >= 256 colors)
    dirEntry.writeUInt8(0, 3);      // Reserved
    dirEntry.writeUInt16LE(1, 4);   // Color planes
    dirEntry.writeUInt16LE(32, 6);  // Bits per pixel
    dirEntry.writeUInt32LE(pngBuffer.length, 8); // PNG image data size
    dirEntry.writeUInt32LE(22, 12); // Offset from start of file (6 header + 16 dir = 22)

    return Buffer.concat([header, dirEntry, pngBuffer]);
}

async function run() {
    try {
        if (!fs.existsSync(sourcePath)) {
            console.error(`Source favicon file not found at: ${sourcePath}`);
            return;
        }

        // Read the source image into memory buffer so we don't lock it or overwrite it before we are done
        const sourceBuffer = fs.readFileSync(sourcePath);
        console.log(`Successfully loaded source favicon (${sourceBuffer.length} bytes)`);

        const publicDir = path.join(__dirname, '../public');
        const deployPublicDir = path.join(__dirname, '../deploy/public');

        // 1. Generate PNG targets
        for (const target of targets) {
            const pngBuffer = await sharp(sourceBuffer)
                .resize(target.size, target.size, {
                    fit: 'contain',
                    background: { r: 0, g: 0, b: 0, alpha: 0 } // transparent background
                })
                .png()
                .toBuffer();

            // Write to /public
            const destPath = path.join(publicDir, target.name);
            fs.writeFileSync(destPath, pngBuffer);
            console.log(`Generated ${target.name} (${target.size}x${target.size}) in public/`);

            // Write to /deploy/public if exists
            if (fs.existsSync(deployPublicDir)) {
                const deployDestPath = path.join(deployPublicDir, target.name);
                fs.writeFileSync(deployDestPath, pngBuffer);
                console.log(`Generated ${target.name} in deploy/public/`);
            }
        }

        // 2. Generate favicon.ico (using 32x32 size)
        const icoPngBuffer = await sharp(sourceBuffer)
            .resize(32, 32, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .png()
            .toBuffer();

        const icoBuffer = toIco(icoPngBuffer, 32);

        // Write favicon.ico to /public
        const icoDestPath = path.join(publicDir, 'favicon.ico');
        fs.writeFileSync(icoDestPath, icoBuffer);
        console.log(`Generated favicon.ico in public/`);

        // Write favicon.ico to /deploy/public if exists
        if (fs.existsSync(deployPublicDir)) {
            const deployIcoDestPath = path.join(deployPublicDir, 'favicon.ico');
            fs.writeFileSync(deployIcoDestPath, icoBuffer);
            console.log(`Generated favicon.ico in deploy/public/`);
        }

        console.log('All favicon assets generated and updated successfully!');
    } catch (error) {
        console.error('Error generating favicons:', error);
    }
}

run();

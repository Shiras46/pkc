const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToCompress = [
    {
        filepath: path.join(__dirname, '../public/image/hero1.jpg'),
        maxWidth: 1920,
        format: 'jpeg',
        options: { quality: 80 }
    },
    {
        filepath: path.join(__dirname, '../public/image/hero2.webp'),
        maxWidth: 1920,
        format: 'webp',
        options: { quality: 80 }
    },
    {
        filepath: path.join(__dirname, '../public/image/HERO3.webp'),
        maxWidth: 1920,
        format: 'webp',
        options: { quality: 80 }
    },
    {
        filepath: path.join(__dirname, '../public/image/hero4.png'),
        maxWidth: 1920,
        format: 'png',
        options: { quality: 80, compressionLevel: 9 }
    },
    {
        filepath: path.join(__dirname, '../public/image/about.webp'),
        maxWidth: 1200,
        format: 'webp',
        options: { quality: 80 }
    },
    {
        filepath: path.join(__dirname, '../public/image/services/catering.webp'),
        maxWidth: 1200,
        format: 'webp',
        options: { quality: 80 }
    },
    {
        filepath: path.join(__dirname, '../public/image/services/decoration.webp'),
        maxWidth: 1200,
        format: 'webp',
        options: { quality: 80 }
    },
    {
        filepath: path.join(__dirname, '../public/image/services/photography.webp'),
        maxWidth: 1200,
        format: 'webp',
        options: { quality: 80 }
    },
    {
        filepath: path.join(__dirname, '../public/image/services/entertainment.webp'),
        maxWidth: 1200,
        format: 'webp',
        options: { quality: 80 }
    },
    {
        filepath: path.join(__dirname, '../public/image/services/ARUN8992.JPG.webp'),
        maxWidth: 1200,
        format: 'webp',
        options: { quality: 80 }
    },
    {
        filepath: path.join(__dirname, '../public/image/services/cars.webp'),
        maxWidth: 1200,
        format: 'webp',
        options: { quality: 80 }
    },
    {
        filepath: path.join(__dirname, '../public/image/services/venue.webp'),
        maxWidth: 1200,
        format: 'webp',
        options: { quality: 80 }
    }
];

async function run() {
    console.log("Starting image compression...");
    for (const item of imagesToCompress) {
        if (!fs.existsSync(item.filepath)) {
            console.warn(`File not found: ${item.filepath}`);
            continue;
        }

        const statsBefore = fs.statSync(item.filepath);
        const tempPath = item.filepath + '.tmp';

        try {
            const buffer = fs.readFileSync(item.filepath);
            let pipeline = sharp(buffer).resize({
                width: item.maxWidth,
                withoutEnlargement: true,
                fit: 'inside'
            });

            if (item.format === 'jpeg') {
                pipeline = pipeline.jpeg(item.options);
            } else if (item.format === 'webp') {
                pipeline = pipeline.webp(item.options);
            } else if (item.format === 'png') {
                pipeline = pipeline.png(item.options);
            }

            await pipeline.toFile(tempPath);

            // Replace original
            if (fs.existsSync(item.filepath)) {
                fs.unlinkSync(item.filepath);
            }
            fs.renameSync(tempPath, item.filepath);

            const statsAfter = fs.statSync(item.filepath);
            const savedPercent = ((statsBefore.size - statsAfter.size) / statsBefore.size * 100).toFixed(2);
            console.log(`Compressed ${path.basename(item.filepath)}: ${(statsBefore.size / 1024 / 1024).toFixed(2)}MB -> ${(statsAfter.size / 1024 / 1024).toFixed(2)}MB (Saved ${savedPercent}%)`);
        } catch (err) {
            console.error(`Error compressing ${item.filepath}:`, err);
            if (fs.existsSync(tempPath)) {
                fs.unlinkSync(tempPath);
            }
        }
    }
    console.log("Image compression complete!");
}

run();

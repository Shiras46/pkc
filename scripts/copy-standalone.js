const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const standaloneDir = path.join(rootDir, '.next', 'standalone');

if (fs.existsSync(standaloneDir)) {
    console.log('Syncing assets into .next/standalone ...');

    // 1. Copy public/ folder into .next/standalone/public
    const publicSrc = path.join(rootDir, 'public');
    const publicDest = path.join(standaloneDir, 'public');
    if (fs.existsSync(publicSrc)) {
        fs.cpSync(publicSrc, publicDest, { recursive: true, force: true });
        console.log('✓ Successfully copied public/ -> .next/standalone/public/');
    }

    // 2. Copy .next/static/ folder into .next/standalone/.next/static
    const staticSrc = path.join(rootDir, '.next', 'static');
    const staticDest = path.join(standaloneDir, '.next', 'static');
    if (fs.existsSync(staticSrc)) {
        fs.cpSync(staticSrc, staticDest, { recursive: true, force: true });
        console.log('✓ Successfully copied .next/static/ -> .next/standalone/.next/static/');
    }

    // 3. Copy .next/server/ folder into .next/standalone/.next/server to ensure all SSR chunks match
    const serverSrc = path.join(rootDir, '.next', 'server');
    const serverDest = path.join(standaloneDir, '.next', 'server');
    if (fs.existsSync(serverSrc)) {
        fs.cpSync(serverSrc, serverDest, { recursive: true, force: true });
        console.log('✓ Successfully synchronized .next/server/ -> .next/standalone/.next/server/');
    }

    // 4. Copy .env and .env.local to standalone directory
    for (const envFile of ['.env', '.env.local', '.env.production']) {
        const envSrc = path.join(rootDir, envFile);
        const envDest = path.join(standaloneDir, envFile);
        if (fs.existsSync(envSrc)) {
            fs.copyFileSync(envSrc, envDest);
            console.log(`✓ Copied ${envFile} -> .next/standalone/${envFile}`);
        }
    }

    console.log('Standalone asset synchronization complete!');
} else {
    console.log('.next/standalone directory not found; skipping standalone copy.');
}

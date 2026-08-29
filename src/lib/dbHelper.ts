import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'src/lib/db.json');

export function getDB() {
    const fileContent = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(fileContent);
}

export function saveDB(data: Record<string, unknown>) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

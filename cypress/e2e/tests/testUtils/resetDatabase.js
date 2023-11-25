import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '../../../../');

dotenv.config({ path: path.join(projectRoot, '.env') });

const source = path.join(projectRoot, process.env.DB_BACKUP_PATH);
const destination = path.join(projectRoot, process.env.DB_TEST_PATH);


function resetDatabase() {
  fs.copyFileSync(source, destination);
  console.log('Database has been reset.');
}

resetDatabase();
import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();

program
    .option('--mode <mode>', 'Ingrese el modo de trabajo', 'DEVELOPMENT')
program.parse();

const environment = program.opts().mode;

const envFilePath = environment === 'DEVELOPMENT'
    ? './.env.development'
    : './.env.production';

console.log(envFilePath)

dotenv.config({ path: envFilePath });

console.log(process.env.PORT)

// export default {
//     port: process.env.PORT,
//     mongoUrl: process.env.MONGO_URL,
//     adminEmail: process.env.ADMIN_EMAIL,
//     adminPassword: process.env.ADMIN_PASSWORD
// };
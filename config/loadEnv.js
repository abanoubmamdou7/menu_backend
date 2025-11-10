import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try multiple possible locations for .env file
const possibleEnvPaths = [
    path.join(__dirname, '.env'),           // BackEnd/config/.env
    path.join(__dirname, '../.env'),        // BackEnd/.env
    path.join(__dirname, '../../.env'),     // Root .env
    path.join(process.cwd(), '.env'),       // Current working directory
    '/config/.env'                      // Docker container path
];

let envLoaded = false;

// Try to load .env from different locations
for (const envPath of possibleEnvPaths) {
    if (fs.existsSync(envPath)) {
        const result = dotenv.config({ path: envPath });
        if (!result.error) {
            console.log(`✅ Loaded environment from ${envPath}`);
            envLoaded = true;
            break;
        }
    }
}

// If no .env file was found, try to use environment variables from Docker
if (!envLoaded) {
    console.log('⚠️ No .env file found, using environment variables from Docker');
}

// Validate required environment variables
const requiredEnvVars = [ 
    // 'SIGNATURE',
    // 'PASSWORD_HMAC_SECRET',
];


const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0) {
    console.error('Missing required environment variables:', missingEnvVars.join(', '));
    process.exit(1);
}

export default {
    loadEnv: () => {
        // The environment is already loaded above
        return process.env;
    }
};



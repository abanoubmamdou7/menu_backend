import { exec } from 'child_process';
import fs from 'fs';
const flagFile = './.prisma-initialized';

export function bootstrapPrisma() {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(flagFile)) {
      console.log("✅ Prisma already initialized.");
      return resolve();
    }

    console.log("🚀 Initializing Prisma...");
    exec('npx prisma generate', (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Prisma init failed:", stderr);
        return reject(error);
      }

      console.log("✅ Prisma client generated:\n", stdout);
      fs.writeFileSync(flagFile, 'initialized');
      resolve();
    });
  });
}

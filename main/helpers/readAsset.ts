import fs from "fs";
import path from "path";
import unzipper from "unzipper";

export default function readAsset(slug) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(slug);
    const unzipStream = readStream.pipe(unzipper.Parse());

    unzipStream.on('entry', async (entry) => {
      const fileName = entry.path;
      if (fileName === 'meta.json') {
        const chunks = [];
        for await (const chunk of entry) {
          chunks.push(chunk);
        }
        const data = Buffer.concat(chunks).toString();
        const res = {
            id: path.basename(slug),
            file: path.basename(slug),
            meta: JSON.parse(data),
        }
        resolve(res);
      } else {
        entry.autodrain();
      }
    });
    unzipStream.on('error', reject);
    readStream.on('error', reject);
  });
}

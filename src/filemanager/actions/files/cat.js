import { stdout, cwd } from 'process';
import { createReadStream } from 'fs';
import { finished } from 'stream/promises';
import { isAbsolute, join } from 'path';

export const cat = async (filePath) => {
    try {
        const absoluteFilePath = isAbsolute(filePath.trim())
            ? filePath.trim()
            : join(cwd(), filePath.trim());

        if (absoluteFilePath.length === 0) {
            throw Error('Operation failed');
        };

        let readStream = createReadStream(absoluteFilePath);

        readStream.pipe(stdout);

        await finished(readStream);
    } catch(error) {
        throw Error(error);
    }
};
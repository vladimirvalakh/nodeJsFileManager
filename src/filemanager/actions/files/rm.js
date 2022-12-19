import { rm as removeFile } from 'fs/promises';
import { isAbsolute, join } from 'path';
import { cwd } from 'process';

export const rm = async (filePath) => {
    try {
        const absoluteFilePath = isAbsolute(filePath.trim())
            ? filePath.trim()
            : join(cwd(), filePath.trim());

        if (absoluteFilePath.length === 0) {
            throw Error('Operation failed');
        };

        await removeFile(absoluteFilePath).then(() => {
            console.log("Success!");
        });
    } catch(error) {
        throw Error(error);
    }
};
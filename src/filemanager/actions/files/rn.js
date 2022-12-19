import { rename } from 'fs/promises';
import { isAbsolute, join } from 'path';
import { cwd } from 'process';

export const rn = async (path, name) => {
    try {
        let absolutePath = isAbsolute(path.trim()) ? path.trim() : join(cwd(), path.trim());

        if (!absolutePath.length) {
            throw Error('Operation failed');
        };

        const newAbsolutePath = `${absolutePath.split('/').slice(0, -1).join('/')}${'/'}${name}`;

        await rename(absolutePath, newAbsolutePath).then(() => {
            console.log("Success!");
        });
    } catch(error) {
        throw Error(error);
    }
};
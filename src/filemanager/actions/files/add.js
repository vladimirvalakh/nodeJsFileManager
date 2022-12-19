import { writeFile } from 'fs/promises';
import { cwd } from 'process';

export const add = async (fileName) => {
    try {
        if (!fileName.length) {
            throw Error('Operation failed');
        };

        await writeFile(`${cwd()}/${fileName.trim()}`, '').then(() => {
            console.log("Success!");
        });

    } catch(error) {
        throw Error(error);
    }
};
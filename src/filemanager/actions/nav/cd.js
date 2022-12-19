import { cwd, chdir } from 'process';
import { isAbsolute, join } from 'path';

export const cd = async (path) => {
    try {
        let absolutePath = isAbsolute(path.trim()) ? path.trim() : join(cwd(), path.trim());
        chdir(absolutePath);
    } catch(error) {
        throw Error('Operation failed');
    }
};
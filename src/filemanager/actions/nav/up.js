import { chdir } from 'process';

export const up = async () => {
    const changedDirectory = '..';

    try {
        chdir(changedDirectory);
    } catch {
        throw Error('Operation failed');
    }
};
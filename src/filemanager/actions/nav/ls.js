import { cwd } from 'process';
import { readdir } from 'fs/promises';

const getType = (file) => {
    if (file.isDirectory()) {
        return 'directory';
    }

    if (file.isFile()) {
        return 'file';
    }
};

const getFile = (file) => ({
    Name: file.name,
    Type: getType(file)
});

const sort = (previousFile, nextFile) => {
    const sortKey = (previousFile.Type === nextFile.Type) ? 'Name' : 'Type';

    return previousFile[sortKey] < nextFile[sortKey] ? -1 : 1;
};

export const ls = async () => {
    try {
        const files = await readdir(cwd(), { withFileTypes: true });
        const list = files
            .filter(getType)
            .map(getFile)
            .sort(sort);

        console.table(list);
    } catch {
        throw Error('Operation failed');
    }
};
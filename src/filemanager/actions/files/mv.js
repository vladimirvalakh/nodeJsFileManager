import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { cwd } from 'process';
import { isAbsolute, join, basename } from 'path';
import fs from 'fs';
import { rm } from 'fs/promises';

export const mv = async (filePath, destinationFolder) => {
    try {
        const absoluteFilePath = isAbsolute(filePath.trim())
            ? filePath.trim()
            : join(cwd(), filePath.trim());

        const absoluteDestinationFolderPath = isAbsolute(destinationFolder.trim())
            ? destinationFolder.trim()
            : join(cwd(), destinationFolder.trim());


        if (absoluteFilePath.length === 0 || absoluteDestinationFolderPath.length === 0) {
            throw Error('Operation failed');
        };

        let isNoExistFilesFolder = !fs.existsSync(absoluteDestinationFolderPath)

        if (isNoExistFilesFolder){
            fs.mkdirSync(absoluteDestinationFolderPath);
        }

        let destinationPath = `${absoluteDestinationFolderPath}/${basename(absoluteFilePath)}`;

        await pipeline(
            createReadStream(absoluteFilePath),
            createWriteStream(destinationPath))
            .then(() => {
                rm(absoluteFilePath);
            })
            .then(() => {
                console.log("Success!");
            });
    } catch(error) {
        throw Error(error);
    }
};
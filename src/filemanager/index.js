import {stdin, stdout, cwd} from 'process';
import {createInterface} from 'readline/promises';
import { ls } from './actions/nav/ls.js';
import { up } from './actions/nav/up.js';
import { cd } from './actions/nav/cd.js';
import { add } from './actions/files/add.js';
import { rn } from './actions/files/rn.js';
import { cp } from './actions/files/cp.js';
import { cat } from './actions/files/cat.js';
import { mv } from './actions/files/mv.js';
import { rm } from './actions/files/rm.js';

const action = {
    'up': up,
    'ls': ls,
    'cd': cd,
    'add': add,
    'rn': rn,
    'cp': cp,
    'cat': cat,
    'mv': mv,
    'rm': rm,
};

const readline = createInterface({
    input: stdin,
    output: stdout,
});

const getCommandText = (commandText) => {
    let command, key, value = '';

    command = commandText.indexOf(' ') !== -1
        ? commandText.slice(0, commandText.indexOf(' ')) : commandText || undefined;

    const keyString = commandText.replace(command, ' ').trim();

    if (keyString.startsWith(`"`)) {
        key = keyString.indexOf(`"`, 1) !== -1
            ? keyString.slice(0, keyString.indexOf(`"`, 1) + 1) : keyString;
    } else {
        key = keyString.indexOf(' ') !== -1
            ? keyString.slice(0, keyString.indexOf(' ')) : keyString || undefined;
    }


    value = keyString.replace(key, ' ').trim() || undefined;

    return [command, key, value];
};

export const filemanager = async (request) => {
    readline.write(`You are currently in ${cwd()}\n`);

    const commandText = await readline.question(request);

    const [command, key, value] = getCommandText(commandText?.trim());

    try {
        if (typeof action[command] !== 'function') {
            throw Error('Invalid input. Could you input another command, please?');
        }

        await action[command](key, value);
    } catch (error) {
        readline.write(`${error}\n`);
    }

    await filemanager(request);
};
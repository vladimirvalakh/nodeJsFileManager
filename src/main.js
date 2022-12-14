import readline from 'readline';
import process, { exit, argv } from 'process';

const exitKeyCode = '\x03'
const userNameKey = argv.find((key) => key.startsWith('--username'));
const isUserNameKey = userNameKey?.indexOf('=');
const username = isUserNameKey
    ? userNameKey.slice(userNameKey.indexOf('=') + 1)
    : '';

process.on('exit', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});

const main = () => {
    console.log(`Welcome to the File Manager, ${username}!`)

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on('keypress', (str) => {
        if (str === exitKeyCode) {
            exit()
        }
    })
};

await main()

import process, { argv } from 'process';

const exitKeyCode = '^C'
const exitCommandText = '.exit'
const userNameKey = argv.find((key) => key.startsWith('--username'));
const isUserNameKey = userNameKey?.indexOf('=');
const username = isUserNameKey
    ? userNameKey.slice(userNameKey.indexOf('=') + 1)
    : '';

process.on('exit', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});

const main = async () => {
    console.log(`Welcome to the File Manager, ${username}!`)

    process.stdin.on('data', data => {
        const isExitSignal =
            (data.toString().trim() === exitCommandText)
            || (data.toString().trim() === exitKeyCode)

        if (isExitSignal) {
            process.exit()
        }
    });
};

await main();
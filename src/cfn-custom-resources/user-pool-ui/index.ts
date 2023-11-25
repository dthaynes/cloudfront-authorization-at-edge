const pather = require('path');
const fs = require('fs');
import { execFile } from "node:child_process";

const getCustomCSS = (path: string) => {
    const text: string = fs.readFileSync(path, 'utf8');
    return text.replace(/\r?\n|\r/g, " ").replace(/\s+/g, ' ');
}

const setUiCustomization = (userPoolId: string) => {
    const css: string = getCustomCSS(pather.resolve(__dirname, 'template.css'))
    const image: string = fs.readFileSync(pather.resolve(__dirname, 'logo.png'), 'base64');
    const args: string[] = [
        'cognito-idp',
        'set-ui-customization',
        '--user-pool-id',
        userPoolId,
        '--css',
        css,
        '--image-file',
        image
    ];
    execFile('aws', args, (err, stdout, stderr) => {
        if (err) {
            throw err;
        }
        console.log(stdout);
        console.log(stderr);
    });
}

const args = process.argv.splice(2);
if (args.length < 1) {
    console.log('argument missing: user-pool-id');
} else {
    console.log(`setting ui customization for user pool ${args[0]}`);
    setUiCustomization(args[0]);
}
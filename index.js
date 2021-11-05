import { getInput, setOutput, setFailed } from '@actions/core';
import { readdirSync } from 'fs';


const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

try {
    var workingDirectory = getInput('working-directory');

    console.log(`Find modules in ${workingDirectory}`);
    const modules = getDirectories(workingDirectory);
    console.log(`Modules list found: ${modules}`);

    setOutput("modules", modules);

} catch (error) {
    setFailed(error.message);
}


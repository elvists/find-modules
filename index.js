const core = require('@actions/core');
const { readdirSync } = require('fs')



const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

try {
    var workingDirectory = core.getInput('working-directory');

    console.log(`Find modules in ${workingDirectory}`);
    const modules = getDirectories(workingDirectory);
    console.log(`Modules list found: ${modules}`);

    core.setOutput("modules", modules);

} catch (error) {
    core.setFailed(error.message);
}


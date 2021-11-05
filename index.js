const core = require('@actions/core');
const { readdirSync } = require('fs')



const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

const verifyHasFolder = (source, subfolder) =>
    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && dirent.name == subfolder).length != 0;

try {
    const workingDirectory = core.getInput('working-directory');
    const subfolderFilter = core.getInput('subfolder-filter');

    console.log(`Find modules in ${workingDirectory}`);
    var modules = getDirectories(workingDirectory);

    if (subfolderFilter != null) {
        modules = modules.filter(module => verifyHasFolder(`${workingDirectory}/${module}`, subfolderFilter));
    }

    console.log(`Modules list found: ${modules}`);
    core.setOutput("modules", modules);

} catch (error) {
    core.setFailed(error.message);
}


import { readFileSync } from "fs";

class Folder {
    constructor(path) {
        this.path = path;
        this.folders = {};
        this.files = {};
    }

    addFolder(path, folderName) {
        if(this.path === path) {
            this.folders[folderName] = new Folder(`${path}${folderName}/`);
        } else {
            const newSubFolder = path.replace(this.path, '').split("/")[0];
            this.folders[newSubFolder].addFolder(path, folderName);
        }
    }

    addFile(path, fileName, fileSize) {
        if(this.path === path) {
            this.files[fileName] = fileSize;
        } else {
            const newSubFolder = path.replace(this.path, '').split("/")[0];
            this.folders[newSubFolder].addFile(path, fileName, fileSize);
        }
    }

    getCurrentDirectorySize() {
        let totalSize = 0;
    
        for(const [fileName, fileSize] of Object.entries(this.files)) {
            totalSize += parseInt(fileSize)
        }

        for(const [folderName, folderObj] of Object.entries(this.folders)) {
            totalSize += folderObj.getCurrentDirectorySize()
        }
    
        return totalSize;
    }
}

const input = readFileSync("commands.txt", "utf-8");

let currentDir = "/";
let lastCommand = [];

const root = new Folder("/");

input.split('\n').forEach(line => {
    if(line.startsWith("$")) {
        lastCommand = line.split(" ");
        lastCommand.shift();

        if(lastCommand[0] === "cd" && lastCommand[1] !== ".." && lastCommand[1] !== "/") {
            currentDir += `${lastCommand[1]}/`;
        }

        if(lastCommand[0] === "cd" && lastCommand[1] === "..") {
            const tmp = currentDir.split("/")
            tmp.shift();
            tmp.pop();
            tmp.pop();
            currentDir = `/${tmp.join("/")}/`;
            if(currentDir === "//") currentDir = "/"
        }
    } else { // output
        const name = line.split(" ");
        if(name[0] === "dir") {
            root.addFolder(currentDir, name[1]);
        } else {
            root.addFile(currentDir, name[1], name[0]);
        }
    }
});

console.log("=== PART 1 ===");

function part1(currentFolders) {
    let totalSize = 0;

    for(const [folderName, folderObj] of Object.entries(currentFolders)) {
        const a = folderObj.getCurrentDirectorySize();
        if(a < 100_000) totalSize += a;
        totalSize += part1(folderObj.folders)
    }
    
    return totalSize;
}


console.log(part1(root.folders))

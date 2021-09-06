import {mkdir} from "fs/promises";
import {splitFile} from "./splitFile";
import {generateFile} from "./generateFile";
import {parallelReadFiles} from "./parallelReadFiles";
const FILE_NAME = 'file.o'
const config = require("config");
const {RAM_LIMIT, NUMBERS_DIRECTORY} = config.get('Settings');

const run = async () => {
    await mkdir(NUMBERS_DIRECTORY, {recursive: true});
    await generateFile();
    await splitFile(RAM_LIMIT, NUMBERS_DIRECTORY, FILE_NAME);
    await parallelReadFiles(NUMBERS_DIRECTORY, RAM_LIMIT);
}

run().catch(console.error)
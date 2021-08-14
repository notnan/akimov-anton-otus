import path from "path";
import {Collector} from "./streams/Collector";
import fs from "fs";
import {promisify} from "util";
import {pipeline} from 'stream';
import {getMaxNumber} from "./utils";

export const parallelReadFiles = async (numbersDirectory, ramLimit) => {
    const pipelineAsync = promisify(pipeline);
    const collector = await new Collector({});
    await collector.init(ramLimit / 2, numbersDirectory, getMaxNumber(Uint32Array.BYTES_PER_ELEMENT));
    const pathFile = path.join(numbersDirectory, 'result.o');
    const writeStream = await fs.createWriteStream(pathFile);

    await pipelineAsync(collector, writeStream);
    console.log('Готово. Файл с отсортированными числами: ', pathFile)
}

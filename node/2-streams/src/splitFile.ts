import fs from "fs";
import {pipeline} from "stream";
import {NumbersStream, FileWriteStream} from './streams';
import {promisify} from "util";

export const splitFile = async (RAM_LIMIT:number, numbersDirectory:string, fileName) => {
        const highWaterMark = Math.round(RAM_LIMIT / 2);
        const numbersStream = await new NumbersStream({highWaterMark, objectMode: true});
        const fileWriteStream = await new FileWriteStream(numbersDirectory, {
                highWaterMark,
                objectMode: true
            },
        );
        const readable = await fs.createReadStream(fileName, {highWaterMark});
        const pipelineAsync = promisify(pipeline);
        await pipelineAsync(readable, numbersStream, fileWriteStream);
        console.log('Исходный файл с числами разделен');
}

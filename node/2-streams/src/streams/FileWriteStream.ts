import {Writable} from 'stream'
import fs from 'fs'

export class FileWriteStream extends Writable {
    private directory: string;
    private chunksCount: number = 1;

    constructor(directory, opt) {
        super(opt);
        this.directory = directory;
    }

    _write(chunk, encoding, callback) {
        let filename = null;

        try {
            filename = `${this.directory}/file_${this.chunksCount}.o`;
            fs.writeFileSync(filename, chunk);
        } catch (err) {
            callback(err);
        } finally {
            this.chunksCount++
            callback()
        }
    }

}
import {createReadStream, ReadStream} from "fs";
import toArrayBuffer from 'to-arraybuffer'

export class NumbersList {
    fsStream: ReadStream;
    currentNumbers: Uint32Array;
    currentIndex: number = 0;
    disabled: boolean = false;

    constructor(filePath, fileSize) {
        this.fsStream = createReadStream(filePath,      {highWaterMark: Math.round(fileSize)});
        this.fsStream.on('end', this.disable);
    }

    public getNumbersFromStream() {
        return new Promise((resolve, reject) => {
            this.fsStream.resume();

            this.fsStream.on('data', (chunk) => {
                this.fsStream.pause();
                if(chunk) {
                    this.currentNumbers = new Uint32Array(toArrayBuffer(chunk));
                    this.currentIndex = 0;
                }
                resolve(this.currentNumbers);
                console.log('getNumberFromStream');
            });
        });
    }

    public incIndex() {
        this.currentIndex++;
    }

    public async getCurrentNum() {
        if(!this.currentNumbers[this.currentIndex]) {
            await this.getNumbersFromStream()
        }
        return this.currentNumbers[this.currentIndex];
    }

    private disable() {
        this.disabled = true;
    }

}
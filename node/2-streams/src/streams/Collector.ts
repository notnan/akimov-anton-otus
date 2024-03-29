import {readdir} from "fs/promises";
import {NumbersList} from "../NumbersList";
import path from "path";
import {Readable} from "stream";

export class Collector extends Readable {
    private numbersList: NumbersList[];
    private numbersDirectory: string;
    private maxNum;
    private currentString = '';

    constructor(opt) {
        super(opt)
    }

    async _read() {
        while (this.hasNumbers()) {
            const number = await this.getSmallestNumberFromStreams();
            const currentNum =`${number}\n`;

            if (Buffer.byteLength(this.currentString, 'utf-8') < 10000) {
                this.currentString += currentNum;
            } else {
                this.push(Buffer.from(this.currentString));
                this.currentString = '';
                this.displayProgress(number);
            }
        }
        if (this.currentString) {
            this.push(Buffer.from(this.currentString))
        }

    }
    async init(memoryLimit, numbersDirectory, maxNum) {
        this.maxNum = maxNum;
        this.numbersDirectory = numbersDirectory;
        const directoryFiles = await readdir(`./${this.numbersDirectory}`);
        this.numbersList = directoryFiles.map((file) => new NumbersList(path.join(this.numbersDirectory, file), memoryLimit/4));

        for (const item of this.numbersList) {
            await item.getNumbersFromStream();
        }
    }

    protected hasNumbers() {
        return this.numbersList.find(({disabled}) => disabled == false);
    }

    private async getSmallestNumberFromStreams() {
        let selectedList = null;
        let smallestNumber = Infinity;
        for (const item of this.numbersList) {
            if (item.disabled) continue;
            const num = await item.getCurrentNum();
            if (smallestNumber >= num) {
                smallestNumber = num;
                selectedList = item;
            }
        }

        selectedList.incIndex();
        return smallestNumber;
    }

    private displayProgress(currentNum) {
        console.clear()
        process.stdout.write(`Прогресс: ${(currentNum/this.maxNum*100).toFixed(2)}%`)
    }

}
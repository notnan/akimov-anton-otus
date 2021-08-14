import {FileHandle, open, writeFile} from 'fs/promises';
import {getCountElements, getMaxNumber, getRandomInteger} from "./utils";
const FILE_NAME = 'file.o'

const getNumbersArray  = () => {
    const sizeNumber = Uint32Array.BYTES_PER_ELEMENT
    const maxNumber = getMaxNumber(sizeNumber);
    const countElements = getCountElements(sizeNumber);
    return new Uint32Array(countElements).map(item => getRandomInteger(0, maxNumber))
}

export const generateFile: () => Promise<FileHandle> = async () => {
    let fileNumbers = null;

    try {
        fileNumbers = await open(FILE_NAME, 'w');
        const array = getNumbersArray();
        await writeFile(fileNumbers, array);
    } finally {
        await fileNumbers?.close();
    }
    console.log('файл создан');
    return fileNumbers;
}

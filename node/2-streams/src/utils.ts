const config = require('config');
const {FILE_SIZE} = config.get('Settings'); // bytes

export const getRandomInteger = (min, max) => {
    // получить случайное число от (min-0.5) до (max+0.5)
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

export const getCountElements = (bytesPerElements) => {
    return FILE_SIZE / bytesPerElements;
}

export const getMaxNumber = (bytesPerElements) => {
    const countBits = bytesPerElements * 8;
    return Math.pow(2, countBits);
}

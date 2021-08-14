import {Transform} from 'stream'
import toArrayBuffer from 'to-arraybuffer'

export class NumbersStream extends Transform {
    _transform(buff, encoding, callback) {
        try {
            const array = new Uint32Array(toArrayBuffer(buff));
            callback(null, array.sort());
        } catch (err) {
            callback(err);
        }
    }
}
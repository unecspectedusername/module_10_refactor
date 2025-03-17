export default class DataParser {
    static parse(JSONdata) {
        try {
            return JSON.parse(JSONdata);
        } catch (error) {
            throw new Error('Некорректный JSON: ' + error.message);
        }
    }
}
export default class Random {
    getRandomInt(max, min = 0) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    getRandomBool() {
        return Math.random() < 0.5;
    }

    getRandomData(array) {
        const randomIndex = this.getRandomInt(array.length);
        return array[randomIndex];
    }
}
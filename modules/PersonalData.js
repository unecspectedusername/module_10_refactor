
import Random from "./Random.js";
import DataParser from './DataParser.js'
export default class PersonalData {
    constructor(data, gender) {
        this.data = data;
        this.gender = gender;
        this.random = new Random();
    }

    get firstName() {
        return this.random.getRandomData(this.data[this.gender].firstName);
    }

    get middleName() {
        const randomName = this.random.getRandomData(this.data.male.firstName);
        if (randomName.endsWith('й')) {
            return this.gender === 'male'
                ? randomName.slice(0, -1) + 'евич'
                : randomName.slice(0, -1) + 'евна';
        } else if (randomName === 'Никита') {
            return this.gender === 'male'
                ? randomName.slice(0, -1) + 'ич'
                : randomName.slice(0, -1) + 'ична';
        } else if (randomName.endsWith('а')) {
            return this.gender === 'male'
                ? randomName.slice(0, -1) + 'ович'
                : randomName.slice(0, -1) + 'овна';
        } else if (randomName.endsWith('ил') && !randomName.endsWith('иил')) {
            return this.gender === 'male'
                ? randomName.slice(0, -2) + 'йлович'
                : randomName.slice(0, -2) + 'йловна';
        } else {
            return this.gender === 'male'
                ? randomName + 'ович'
                : randomName + 'овна';
        }
    }

    get lastName() {
        return this.gender === 'male' ?
            this.random.getRandomData(this.data.surname) :
            this.random.getRandomData(this.data.surname) + 'а'
    }

    get avatar() {
        return this.random.getRandomData(this.data[this.gender].avatar)
    }
}
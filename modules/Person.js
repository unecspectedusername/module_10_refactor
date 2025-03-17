import Random from "./Random.js";
import Birthday from "./Birthday.js";
import PersonalData from "./PersonalData.js";
class Person {
    constructor({ data, personalData, random, birthday, gender}) {
        this.data = data;
        this.personalData = personalData;
        this.random = random;
        this.birthday = birthday;
        this._gender = gender;
    }

    log() {
        console.log(this._gender)
    }
}

class Employed extends Person {
    constructor(parentArgs) {
        super(parentArgs);
    }

    get profession() {
        return this.random.getRandomData(this.data[this._gender].profession)
    }

}

export class Woman extends Employed {

    constructor(parentArgs) {
        super(parentArgs);
    }

    get gender() {
        return 'Женщина';
    }

}

export class Man extends Employed {
    constructor(parentArgs) {
        super(parentArgs);
    }

    get gender() {
        return 'Мужчина';
    }
}
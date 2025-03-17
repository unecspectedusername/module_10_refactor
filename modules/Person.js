import Random from "./Random.js";
import Birthday from "./Birthday.js";
import PersonalData from "./PersonalData.js";
class Person {
    constructor({ data, personalData, random, birthday}) {
        this.data = data;
        this.personalData = personalData;
        this.random = random;
        this.birthday = birthday;
    }
}

export class Woman extends Person {

    constructor({ gender = 'female', ...personArgs}) {
        super(personArgs);
    }

    get profession() {
        return this.random.getRandomData(this.data.female.profession)
    }

    get gender() {
        return 'Женщина';
    }

}

export class Man extends Person {
    constructor({ gender = 'female', ...personArgs}) {
        super(personArgs);
    }

    get profession() {
        console.log(this.data)
        return this.random.getRandomData(this.data.male.profession)
    }

    get gender() {
        return 'Мужчина';
    }
}
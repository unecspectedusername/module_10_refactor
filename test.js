class Random {
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
class Birthday {

    random = new Random();

    months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря'
    ]
    year = this.random.getRandomInt(2010, 1990);
    month = this.random.getRandomData(this.months)
    get day() {
        if (['апреля', 'июня', 'сентября', 'ноября'].includes(this.month)) {
            return this.random.getRandomInt(30, 1);
        } else if (this.month === 'февраля') {
            // проверяем високосный год или нет
            if ((this.year/4) % 1 === 0) {
                return this.random.getRandomInt(29, 1);
            } else {
                return this.random.getRandomInt(28, 1);
            }
        } else {
            return this.random.getRandomInt(31, 1);
        }
    }
}

class PersonalData {
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
class DataParser {
    static parse(JSONdata) {
        try {
            return JSON.parse(JSONdata);
        } catch (error) {
            throw new Error('Некорректный JSON: ' + error.message);
        }
    }
}

class Person {
    constructor({ data, personalData, random, birthday}) {
        this.data = data;
        this.personalData = personalData;
        this.random = random;
        this.birthday = birthday;
    }
}

class Woman extends Person {

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

class Man extends Person {
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
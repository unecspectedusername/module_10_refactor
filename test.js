const data = `{
  "surname": [
    "Иванов",
    "Смирнов",
    "Кузнецов",
    "Васильев",
    "Петров",
    "Михайлов",
    "Новиков",
    "Федоров",
    "Кравцов",
    "Николаев",
    "Семёнов",
    "Славин",
    "Степанов",
    "Павлов",
    "Александров",
    "Морозов"
  ],
  "male": {
    "firstName": [
      "Александр",
      "Максим",
      "Иван",
      "Артем",
      "Дмитрий",
      "Никита",
      "Михаил",
      "Даниил",
      "Егор",
      "Андрей"
    ],
    "profession": [
      "Манекен для краш-тестов",
      "Решатель капчи",
      "Пивной сомелье",
      "Телеканал РЕН-ТВ: штатный экзорцист",
      "Акробат - гомеопат",
      "Гений, миллиардер, филантроп",
      "UX/UI дизайнер Facebook (запрещено в РФ)",
      "Разработчик браузера Амиго",
      "Коллекционер плагинов VS Code",
      "Проставитель точки с запятой в коде JS"
    ],
    "avatar": [
      "assets/m1.jpg",
      "assets/m2.jpg",
      "assets/m3.jpg",
      "assets/m4.jpg",
      "assets/m5.jpg",
      "assets/m6.jpg",
      "assets/m7.jpg",
      "assets/m8.jpg",
      "assets/m9.jpg",
      "assets/m10.jpg"
    ]
  },
  "female": {
    "firstName": [
      "Ольга",
      "Екатерина",
      "Елизавета",
      "Ирина",
      "Наталья",
      "Анна",
      "Анастасия",
      "Татьяна",
      "Елена",
      "Марина"
    ],
    "profession": [
      "Штатный таролог Московской биржи",
      "Распутывательница проводов наушников",
      "Автоответчица в колл-центре",
      "Критик турецких сериалов",
      "Металлургиня",
      "Разрабатывательница феминитивов",
      "Потомственная ведунья",
      "Телеграм бот",
      "PR менеджер Алексея Панина",
      "Тренер личностного упадка"
    ],
    "avatar": [
      "assets/w1.jpg",
      "assets/w2.jpg",
      "assets/w3.jpg",
      "assets/w4.jpg",
      "assets/w5.jpg",
      "assets/w6.jpg",
      "assets/w7.jpg",
      "assets/w8.jpg",
      "assets/w9.jpg",
      "assets/w10.jpg"
    ]
  }
}`

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

class DataParser {
    static parse(JSONdata) {
        try {
            return JSON.parse(JSONdata);
        } catch (error) {
            throw new Error('Некорректный JSON: ' + error.message);
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

class Woman extends Employed {

    constructor(parentArgs) {
        super(parentArgs);
    }

    get gender() {
        return 'Женщина';
    }

}

class Man extends Employed {
    constructor(parentArgs) {
        super(parentArgs);
    }

    get gender() {
        return 'Мужчина';
    }
}
const personGenerator = {

    GENDER_MALE: 'Мужчина',
    GENDER_FEMALE: 'Женщина',

    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

    randomValue: function (json) {
        const obj = JSON.parse(json);
        const prop = `id_${this.randomIntNumber(obj.count, 1)}`;  // this = personGenerator
        return obj.list[prop];
    },

    randomAvatar: function () {
        if (this.person.gender === 'Мужчина') {
            return this.randomValue(this.avatarMaleJson);
        } else {
            return this.randomValue(this.avatarFemaleJson);
        }
    },

    randomFirstName: function () {

        if (this.person.gender === 'Мужчина') {
            return this.randomValue(this.firstNameMaleJson);
        } else {
            return this.randomValue(this.firstNameFemaleJson);
        }

    },

    randomMiddleName: function () {

        let name = this.randomValue(this.firstNameMaleJson);
        let male = this.person.gender == 'Мужчина';

        if (name.slice(-1) == 'й') {
            return male ? name.slice(0, -1) + 'евич' : name.slice(0, -1) + 'евна';
        } else if (name == 'Никита') {
            return male ? name.slice(0, -1) + 'ич' : name.slice(0, -1) + 'ична';
        } else if (name.slice(-1) == 'а') {
            return male ? name.slice(0, -1) + 'ович' : name.slice(0, -1) + 'овна';
        } else if (name.slice(-2) == 'ил' && name.slice(-3) !== 'иил') {
            return male ? name.slice(0, -2) + 'йлович' : name.slice(0, -2) + 'йловна';
        } else if (name.slice(-2) == 'ил' && name.slice(-3) != 'иил') {
            return male ? name.slice(0, -2) + 'йлович' : name.slice(0, -2) + 'йловна';
        } else {
            return male ? name + 'ович' : name + 'овна';
        }

    },

    randomSurname: function () {

        return this.person.gender == 'Мужчина' ? this.randomValue(this.surnameJson) : this.randomValue(this.surnameJson) + 'а';

    },

    randomGender: function () {

        return this.randomIntNumber() === 0 ? this.GENDER_MALE : this.GENDER_FEMALE;

    },

    randomDate: function () {
        const year = this.randomIntNumber(2010, 1990);
        const month = this.randomValue(this.monthOfBirthJson);
        let day;
        if (month == 'апреля' || month == 'июня' || month == 'сентября' || month == 'ноября') {
            // если один из этих месяцев, значит в нем 30 дней
            day = this.randomIntNumber(30, 1);
        } else if (month == 'февраля') {
            // чтобы определить, сколько дней в феврале, нужно узнать високосный год или нет. Для этого добавляем условие
            if ((year/4) % 1 === 0) {
                // если год делится на 4 без остатка, значит он високосный
                day = this.randomIntNumber(29, 1);
            } else {
                day = this.randomIntNumber(28, 1);
            }
        } else {
            // во всех остальных случаях - 31 день.
            day = this.randomIntNumber(31, 1);
        }

        return (`${day} ${month} ${year}`);
    },

    randomProfession: function () {
        if ((this.person.gender === 'Мужчина')) {
            return this.randomValue(this.professionMaleJson);
        } else {
            return this.randomValue(this.professionFemaleJson);
        }
    },


    getPerson: function () {
        this.person = {};
        this.person.gender = this.randomGender();
        this.person.avatar = this.randomAvatar();
        this.person.firstName = this.randomFirstName();
        this.person.middleName = this.randomMiddleName();
        this.person.surname = this.randomSurname();
        this.person.birthDate = this.randomDate();
        this.person.profession = this.randomProfession();
        return this.person;
    }
};
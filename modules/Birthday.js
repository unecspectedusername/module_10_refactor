import Random from "./Random.js";
export default class Birthday {

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
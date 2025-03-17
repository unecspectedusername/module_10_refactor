import { Man, Woman } from "./modules/Person.js";
import Random from "./modules/Random.js";
import PersonalData from "./modules/PersonalData.js";
import Birthday from "./modules/Birthday.js";
import {data} from "./modules/Data.js";
import DataParser from "./modules/DataParser.js";

window.onload = function() {
    makeRandomPerson();
};
function makeRandomPerson () {
    const props = {
        data: DataParser.parse(data),
        random: new Random(),
        birthday: new Birthday()
    }
    props.gender = props.random.getRandomBool() ? 'male' : 'female';
    props.personalData = new PersonalData(props.data, props.gender)

    const person = props.gender === 'male' ? new Man(props) : new Woman(props);

    document.querySelector('#image').style.backgroundImage = `url('${person.personalData.avatar}')`;
    document.querySelector('#name').textContent = `${person.personalData.firstName} ${person.personalData.middleName} ${person.personalData.lastName}`;
    document.querySelector('#gender').textContent = person.gender;
    document.querySelector('#date').textContent = `${person.birthday.day} ${person.birthday.month} ${person.birthday.year} `;
    document.querySelector('#profession').textContent = person.profession;
}

document.querySelector('#generate').addEventListener('click', function() {
    makeRandomPerson();
});

document.querySelector('#clear').addEventListener('click', function() {
    document.querySelector('#image').style.backgroundImage = null;
    document.querySelector('#name').textContent = null;
    document.querySelector('#gender').textContent = null;
    document.querySelector('#date').textContent = null;
    document.querySelector('#profession').textContent = null;
});

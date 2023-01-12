import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { showCountryList, showCountryCard } from './markup';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};
const { input, countryList, countryInfo } = refs;

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch (e) {
    e.preventDefault();
    let searchValue = input.value;
    console.log(searchValue);
    if(searchValue.trim() === "") {
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
        return;
    }

fetchCountries(searchValue.trim())
.then(countries => {
    if(countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
        return;
    } 

    if(countries.length > 1 && countries.length <= 10) {
        const markup = countries.map(country => showCountryList(country))
        countryList.innerHTML = markup.join('');
        countryInfo.innerHTML = "";
    }

    if(countries.length === 1) {
        const cardMarcup = countries.map(country => showCountryCard(country));
        countryList.innerHTML = "";
        countryInfo.innerHTML = cardMarcup.join('');
    }
    })

    .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
        return error;
    })
}



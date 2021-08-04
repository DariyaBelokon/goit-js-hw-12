import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from "notiflix";

import countryCardTpl from './templates/countryCard.hbs';
import countriesListTpl from './templates/countries-list.hbs';

const DEBOUNCE_DELAY = 300;

const debounce = require('lodash.debounce');

const refs = {
    inputCountryName: document.querySelector('input#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

function onFetchError () {
    Notiflix.Notify.failure('Oops, there is no country with that name.');   
}
const countriesFiltration = (e) => {
    e.preventDefault();
    let clientsRequest = e.target.value.trim();
    console.log(clientsRequest);
    if (!clientsRequest) {
        refs.countryList.innerHTML = "";
        return;
    };
    fetchCountries(clientsRequest)
        .then(createCountriesListElements)
        .catch(onFetchError);
    // if (clientsRequest = "") {
    //     refs.countryList.innerHTML = "";
    //     return;
    // };
    // fetchCountries(clientsRequest)
    //     .then(createCountriesListElements)
    //     .catch(onFetchError);
};
refs.inputCountryName.addEventListener('input', debounce(countriesFiltration, DEBOUNCE_DELAY));

const createCountriesListElements = (country) => {
    refs.countryList.innerHTML = "";
    if (country.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (country.length > 1 && country.length <= 10) {
        createCountriesList(country);
    } else if (country.length === 1) {
        createCountryCard(country);
    };
    const createCountriesList = (country) => {
        const createList = countriesListTpl(country);
        refs.countryList.innerHTML = `${createList}`;
    };
    const createCountryCard = (country) => {
        const createCard = countryCardTpl(country);
        refs.countryList.innerHTML = `${createCard}`;
    }
}


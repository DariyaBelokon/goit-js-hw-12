import './css/styles.css';
 import { fetchCountries } from './fetchCountries.js';
import Notiflix from "notiflix";

import countryCardTpl from './templates/countryCard.hbs';
import countriesListTpl from './templates/countries-list.hbs';

const DEBOUNCE_DELAY = 300;

const debounce = require('lodash.debounce');

const refs = {
    // inputCountryName: document.querySelector('input#search-box'),
    inputCountryName: document.querySelector('input#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

function onFetchError() {
    refs.countryList.innerHTML = '';
     Notiflix.Notify.failure('Oops, there is no country with that name.');   
}
 
function shortDescription(data) {
    // const newArr = data.map(element => `<li><p class="country-name">${element.name}</p></li>`);
    // console.log(newArr);
    // refs.countryList.insertAdjacentHTML('beforeend', newArr.join(" "));
    const markup = countriesListTpl(data);
    refs.countryList.insertAdjacentHTML('afterbegin', markup);
}

function detailDescription(data) {
    const cardMarkup = countryCardTpl(data);
    refs.countryList.insertAdjacentHTML('afterbegin', cardMarkup);
}

function countriesFiltration  (e)  {
    e.preventDefault();
    let clientsRequest = refs.inputCountryName.value;
    if (clientsRequest.trim() === '') {
        refs.countryList.innerHTML = '';
        return
    } 
    fetchCountries(clientsRequest)
        .then(data => {
            console.log(data)
            refs.countryList.innerHTML = '';
            if (data.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                return
            } 
            if (data.length > 1 && data.length <= 10) {
                shortDescription(data);
                return
            }
            if (data.length === 1) {
                return detailDescription(data); 
            } 
        }
    )
        .catch(onFetchError);
};
refs.inputCountryName.addEventListener('input', debounce(countriesFiltration, DEBOUNCE_DELAY));

 











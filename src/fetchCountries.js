
export function fetchCountries(country) {
    const FILTRES = 'fields=name;capital;population;flag;languages';
     return fetch(`https://restcountries.eu/rest/v2/name/${country}?${FILTRES}`)
         .then(data => {
              if(!data.ok) {throw new onFetchError(data.status);}
            return data.json()
         })
}
export function fetchCountries(name) {
    const FILTRES = 'fields=name;capital;population;flag;languages';
    console.log(name);
    return fetch(`https://restcountries.eu/rest/v2/name/${name}?${FILTRES}`)
    .then(response => {
        if (!response.ok) {
            throw new onFetchError(response.status);
          }
          return response.json();
    });
}
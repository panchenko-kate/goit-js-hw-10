export function showCountryList ({ flags, name }){
    return `
    <li class = country-item>
    <img class = 'country-list__flags' src="${flags.svg}" alt="${name.official}" width = 40/>
    <h2 class = country-list__name>${name.official}</h2>
    </li>
    `
}

export function showCountryCard({ flags, name, capital, population, languages }) {
    return `
    <div class="country">
    <div class="country-name">
      <img class = "capital-flag" src="${flags.svg}" alt="${name.official}" width = 60/>
      <h2 class = "country-title"> ${name.official}</h2>
    </div>
      <p class = "country-text"><span>Capital:</span> ${capital}</p>
      <p class="country-text"><span>Population:</span> ${population}</p>
      <p class="country-text"><span>Languages:</span> ${Object.values(languages)}</p>
    </div>
    `
}
export interface Country {
    _id: string
    // makeId()
    name: string
    // name.common
    flagUrl: string
    // coatOfArms.png
    nativeName: string
    // Object.values(name.nativeName)[0].common
    population: number
    // population
    region: string
    // region
    subregion: string
    // subregion
    capital: string
    // capital[0]
    tld: string
    // tld[0]
    currencies: Array<string>
    // Object.values(currencies).map(currency => currency.name)
    languages: Array<string>
    // Object.values(languages)
    borders: Array<string>
    // borders (need to get all names by shortcuts with a script to a JSON)
}

export type Countries = Array<Country>

// export interface UnformattedCountry {

// }
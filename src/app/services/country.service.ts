import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { Countries, Country } from '../models/country';
import { UtilService } from './util.service';
import { CountryFilter } from '../models/country-filter';

interface Name {
  common: string
  official: string
  nativeName: object
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  //mock the server
  private _countriesDb: Country[] = []

  private _countries$ = new BehaviorSubject<Country[]>([])
  public countries$ = this._countries$.asObservable()
  //filter
  private _filterBy$ = new BehaviorSubject<CountryFilter>({ region: 'all', txt: '' })
  public filterBy$ = this._filterBy$.asObservable()

  constructor(private http: HttpClient, private utilService: UtilService) {
  }


  private _formatCountry(country: any): Country {

    const { name, population, flags: flagUrls, region, subregion,
      capital, tld, currencies, languages, borders
    }: {
      name: Name, population: number, flags: { png: string, svg: string }, region: string, subregion: string,
      capital: Array<string>, tld: Array<string>, currencies: object,
      languages: Array<string>, borders: Array<string>
    } = country

    return {
      _id: this.utilService.makeId(),
      name: name.common,
      flagUrl: flagUrls.png,
      nativeName: name.nativeName ? Object.values(name.nativeName)[0].common : 'Unknown',
      population,
      region,
      subregion,
      capital: capital ? capital[0] : 'None',
      tld: tld ? tld[0] : 'None',
      currencies: currencies ? Object.values(currencies).map(currency => currency.name) : ['None'],
      languages: languages ? Object.values(languages) : ['None'],
      borders
    }
  }

  public loadCountries(): void {
    const countriesFromStorage = this.utilService.loadFromStorage('countriesDb')

    if (countriesFromStorage) {
      this._countriesDb = countriesFromStorage
      this._sendCountries(this._countriesDb)
    } else {
      this._getCountriesFromApi(200)
    }

    // .pipe(map(res =>  res))   
    // if (filterBy && filterBy.term) {
    //   countries = this._filter(countries, filterBy.term)
    // }
    // this._countries$.next(this._sort(countries))
  }

  private _getCountriesFromApi(amount: number = 200) {
    this.http.get<Array<object>>(`https://restcountries.com/v3.1/all`).pipe(
      map((countries: Array<object>) => {
        return countries.filter((_, idx) => idx < amount)
          .map(country => this._formatCountry(country))
      })
    ).subscribe({
      next: (countries: Countries) => {
        this._countriesDb = countries
        this._sendCountries(countries)
        this._saveCountriesToStorage()
      },
      error: err => console.log(err),
    })
  }


  public getCountryById(id: string): Observable<Country> {
    //mock the server work
    const country = this._countriesDb.find(country => country._id === id)

    //return an observable
    if (!country) return throwError(`Country not found with id ${id}`)
    return of(country) //: Promise.resolve(null)//Observable.throw(`Country id ${id} not found!`)
  }

  public removeCountry(id: string) {
    //mock the server work
    this._countriesDb = this._countriesDb.filter(country => country._id !== id)

    this._sendCountries(this._countriesDb)
    this._saveCountriesToStorage()
  }

  public saveCountry(country: Country) {
    console.log('save country', country);

    return country._id ? this._updateCountry(country) : this._addCountry(country)
  }

  // public getEmptyCountry() {
  //   return { name: "", email: "", phone: "" }
  // }

  private _updateCountry(country: Country) {
    //mock the server work
    this._countriesDb = this._countriesDb.map(c => country._id === c._id ? country : c)
    // change the observable data in the service - let all the subscribers know
    // this._countries$.next(this._sort(this._countriesDb))
    this._sendCountries(this._countriesDb)
    this._saveCountriesToStorage()
    return of(country)

  }

  private _addCountry(country: Country) {
    //mock the server work

    // const newCountry = new Country(country.name, country.email, country.phone);
    // newCountry.setId();

    // this._countriesDb.push({ ...newCountry })

    // this._countries$.next(this._sort(this._countriesDb))
    this._sendCountries(this._countriesDb)
    this._saveCountriesToStorage()
    return of(country)
  }


  private _sort(countries: Country[]): Country[] {
    return countries.sort((a, b) => {
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
        return -1;
      }
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        return 1;
      }

      return 0;
    })
  }

  setFilter(filterBy: CountryFilter) {
    // *Every filter we have a request sent, could be saved by working with this._countries$
    this._filterBy$.next(filterBy)
    this._filter()
  }

  private _filter(): void {
    const countries = this.utilService.loadFromStorage('countriesDb')
    const filterBy = this._filterBy$.getValue()

    const { region, txt } = filterBy
    let countriesToShow = JSON.parse(JSON.stringify(countries))

    if (region && region !== 'all') {
      countriesToShow = countriesToShow.filter((country: any) => country.region === region)
    }

    if (txt) {
      const nameRegex = new RegExp(txt, 'i')
      countriesToShow = countriesToShow.filter((country: any) => nameRegex.test(country.name.common))
    }

    console.log('countriesToShow', countriesToShow);

    this._sendCountries(countriesToShow)
  }

  private _saveCountriesToStorage() {
    this.utilService.saveToStorage('countriesDb', this._countries$.getValue())
  }

  private _sendCountries(countries: Countries) {
    this._countries$.next(countries)
  }
}

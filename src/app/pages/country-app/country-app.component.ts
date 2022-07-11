import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Countries, Country } from 'src/app/models/country';
import { CountryFilter } from 'src/app/models/country-filter';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-app',
  templateUrl: './country-app.component.html',
  styleUrls: ['./country-app.component.scss']
})
export class CountryAppComponent implements OnInit {

  filterBy: CountryFilter | null = null
  subscription: Subscription

  countries$: Observable<Countries> | null = null

  constructor(private countryService: CountryService, private router: Router) {
    this.subscription = this.countryService.filterBy$.subscribe(filterBy => {
      this.filterBy = filterBy
    })
  }

  ngOnInit(): void {
    this.countryService.loadCountries()
    this.countries$ = this.countryService.countries$
  }

  filter() {
    if (!this.filterBy) return
    this.countryService.setFilter({ ...this.filterBy })
  }

  remove(id: string) {
    console.log('remove', id);
    this.countryService.removeCountry(id)
  }

  edit(id: string) {
    console.log('edit', id);
    this.router.navigateByUrl(`edit/${id}`)
  }

}

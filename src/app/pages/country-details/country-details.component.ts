import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {

  country: Country | null = null

  constructor(private countryService: CountryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(async ({ id }) => {
      // this.countryToEdit = id ? await firstValueFrom(this.petService.getById(id), { defaultValue: undefined }) : this.petService.getEmptyPet() as Pet
      this.country = await this.countryService.getCountryById(id).toPromise()
    })
  }

  back() {
    this.router.navigateByUrl('')
  }

}

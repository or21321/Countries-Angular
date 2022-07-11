import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.scss']
})
export class CountryEditComponent implements OnInit {

  countryToEdit: Country | null = null

  constructor(private countryService: CountryService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //with resolver
    // this.route.data.subscribe(({ contact }) => {
    //   this.contact = contact?._id ? contact : this.contactService.getEmptyContact() as Contact
    // })

    //no resolver way
    this.route.params.subscribe(async ({ id }) => {
      // this.countryToEdit = id ? await firstValueFrom(this.petService.getById(id), { defaultValue: undefined }) : this.petService.getEmptyPet() as Pet
      this.countryToEdit = await this.countryService.getCountryById(id).toPromise()
      console.log('countryToEdit', this.countryToEdit);
    })
  }

  async submit(ev: Event) {
    ev.preventDefault()
    if (!this.countryToEdit) return
    console.log('submit', this.countryToEdit);
    await this.countryService.saveCountry(this.countryToEdit).toPromise()
    this.closeModal()
  }

  closeModal() {
    console.log('closeModal()');
    this.router.navigateByUrl('')
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'country-preview',
  templateUrl: './country-preview.component.html',
  styleUrls: ['./country-preview.component.scss']
})
export class CountryPreviewComponent implements OnInit {
  @Input() country: Country | null = null

  @Output() onRemove = new EventEmitter<string>()
  @Output() onEdit = new EventEmitter<string>()

  isOptionsOpen: boolean = false
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onRightClick(ev: Event) {
    ev.preventDefault()
    this.isOptionsOpen = true
  }

  selectCountry() {
    this.router.navigateByUrl(`details/${this.country?._id}`)
  }


}

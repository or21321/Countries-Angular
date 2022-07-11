import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Countries } from 'src/app/models/country';

@Component({
  selector: 'country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  @Input() countries: Countries | null = null

  @Output() onRemove = new EventEmitter<string>()
  @Output() onEdit = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

}

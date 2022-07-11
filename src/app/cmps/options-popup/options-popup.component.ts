import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'options-popup',
  templateUrl: './options-popup.component.html',
  styleUrls: ['./options-popup.component.scss']
})
export class OptionsPopupComponent implements OnInit {

  @Output() onRemove = new EventEmitter<string>()
  @Output() onEdit = new EventEmitter<string>()
  @Output() onSelectCountry = new EventEmitter<void>()
  @Output() onClose = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  closePopup() {
    this.onClose.emit()
  }


}

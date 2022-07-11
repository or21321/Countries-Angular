import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { CountryAppComponent } from './pages/country-app/country-app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CountryListComponent } from './cmps/country-list/country-list.component';
import { CountryPreviewComponent } from './cmps/country-preview/country-preview.component';
import { OptionsPopupComponent } from './cmps/options-popup/options-popup.component';
import { CountryEditComponent } from './cmps/country-edit/country-edit.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    CountryAppComponent,
    CountryListComponent,
    CountryPreviewComponent,
    OptionsPopupComponent,
    CountryEditComponent,
    ClickOutsideDirective,
    CountryDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

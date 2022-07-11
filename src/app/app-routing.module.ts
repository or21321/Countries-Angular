import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryAppComponent } from './pages/country-app/country-app.component';
import { CountryEditComponent } from './cmps/country-edit/country-edit.component';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';

const routes: Routes = [
  {
    path: '', component: CountryAppComponent, children: [
      { path: 'edit/:id', component: CountryEditComponent }
    ]
  },
  { path: 'details/:id', component: CountryDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

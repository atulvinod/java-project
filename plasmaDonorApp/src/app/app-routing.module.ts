import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDonorComponent } from './components/add-donor/add-donor.component';
import { SearchDonorComponent } from './components/search-donor/search-donor.component';


const routes: Routes = [
 {
   path :'',
   component:AddDonorComponent
   
 },
 {
   path:'searchDonor',
   component:SearchDonorComponent
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

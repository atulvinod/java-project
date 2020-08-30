import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { donorModel } from 'src/app/model/donorModel';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-search-donor',
  templateUrl: './search-donor.component.html',
  styleUrls: ['./search-donor.component.css']
})
export class SearchDonorComponent implements OnInit {

  donorSearch:FormGroup
  states = []
  districts= []

  searchData:donorModel[] = []

  stateToDistrict: Map < string, any > = new Map < string, any> ()
  countryToState: Map < string, Map < string, any >> = new Map < string, Map < string, any >> ();
  
  constructor( private http: HttpService) {
    let countryIndia: Map < string, any > = new Map < string,
      any > ();
    let countryNepal: Map < string, any > = new Map < string,
      any > ();

    countryIndia.set("Jammu And Kashmir", ['Doda', 'Kishtwar']);
    countryIndia.set("Goa", ["Goa", "Panaji"]);
    countryNepal.set("Bhagmati", ["Bhaktapur", "Lalitpur"])
    countryNepal.set("Bheri", ["Banke", "Bardiya"])

    this.countryToState.set("India", countryIndia);
    this.countryToState.set("Nepal", countryNepal);
   }

  ngOnInit(): void {

    this.donorSearch = new FormGroup({
      bloodGroup: new FormControl("A+", [Validators.required]),
      country: new FormControl("---", [Validators.required]),
      state: new FormControl("---", [Validators.required]),
      district: new FormControl("---", [Validators.required]),


    })

    this.donorSearch.get("country").valueChanges.subscribe(data => {

    
      this.stateToDistrict = this.countryToState.get(data)
      let x = Array.from(this.countryToState.get(data).keys());
      for (let i = 0; i < x.length; i++) {
        this.states.push(x[i])
      }
      this.donorSearch.get("state").patchValue(x[0])
    })


    this.donorSearch.get("state").valueChanges.subscribe(data => {
      this.districts = []
     let x = Array.from(this.stateToDistrict.get(data));
     for (let i = 0; i < x.length; i++) {
      this.districts.push(x[i])
    }
    this.donorSearch.get("district").patchValue(x[0]);
    })
  }
  getData(){
    let donorData:{} = {}
    donorData['blood_group'] = this.donorSearch.value['bloodGroup']
    donorData['country'] = this.donorSearch.value['country']
    donorData['state'] = this.donorSearch.value['state']
    donorData['district'] = this.donorSearch.value['district']
    this.http.getFilteredDonors(donorData).subscribe((value:donorModel[])=>{
      
      this.searchData = value;
    })
    console.log(donorData)
  }

}

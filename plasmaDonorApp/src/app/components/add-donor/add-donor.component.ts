import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  HttpClient
} from '@angular/common/http';
import {
  stringify
} from 'querystring';
import { ThrowStmt } from '@angular/compiler';
import { donorModel } from 'src/app/model/donorModel';

import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-add-donor',
  templateUrl: './add-donor.component.html',
  styleUrls: ['./add-donor.component.css']
})
export class AddDonorComponent implements OnInit {

  coronaRecoveredCount
  addDonorFrom: FormGroup
  selectedCountry = false;
  selectedState = false;
  selectedDistrict = false
  states = []
  districts= []

  stateToDistrict: Map < string, any > = new Map < string, any> ()
  countryToState: Map < string, Map < string, any >> = new Map < string, Map < string, any >> ();

  constructor(private http: HttpClient,private httpService: HttpService) {}

  ngOnInit(): void {

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




    this.http.get('https://corona.lmao.ninja/v2/countries/India?yesterday&strict&query%20').subscribe(data => {
      this.coronaRecoveredCount = data['recovered'];
    })

    this.addDonorFrom = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),

      blood_group: new FormControl("A+", [Validators.required]),
      country: new FormControl("---", [Validators.required]),
      state: new FormControl("---", [Validators.required]),
      district: new FormControl("---", [Validators.required]),


    })

    this.addDonorFrom.get("country").valueChanges.subscribe(data => {

    
      this.stateToDistrict = this.countryToState.get(data)
      let x = Array.from(this.countryToState.get(data).keys());
      for (let i = 0; i < x.length; i++) {
        this.states.push(x[i])
      }
      this.addDonorFrom.get("state").patchValue(x[0])
    })


    this.addDonorFrom.get("state").valueChanges.subscribe(data => {
      this.districts = []
     let x = Array.from(this.stateToDistrict.get(data));
     for (let i = 0; i < x.length; i++) {
      this.districts.push(x[i])
    }
    this.addDonorFrom.get("district").patchValue(x[0]);
    })
    

  }
  submit(){
    let data:donorModel = this.addDonorFrom.value;
    this.httpService.postDetails(data).subscribe(value=>{
      alert("Your application has been submitted")
      this.addDonorFrom.reset()
    })
  }

}

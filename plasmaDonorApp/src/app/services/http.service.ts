import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { donorModel } from '../model/donorModel';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  postDetails(donorModel:donorModel){
    return this.http.post('/createDonor',donorModel)
  }

  getAllDonors(){
    return this.http.get("/getAllDonors")
  }
  
  getFilteredDonors(donorModel:{}){

    return this.http.post('/getFilteredDonors',donorModel)
  }
}

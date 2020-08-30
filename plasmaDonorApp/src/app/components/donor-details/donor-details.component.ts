import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-donor-details',
  templateUrl: './donor-details.component.html',
  styleUrls: ['./donor-details.component.css']
})
export class DonorDetailsComponent implements OnInit {

  @Input() donorData
  constructor() { }

  ngOnInit(): void {
  }

}

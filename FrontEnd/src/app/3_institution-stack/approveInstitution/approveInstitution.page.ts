import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approveInstitution',
  templateUrl: 'approveInstitution.page.html',
  styleUrls: ['approveInstitution.page.scss']
})


export class ApproveInstitutionPage implements OnInit {

    newInstitutionAddress: string
    // search page should contain search organization component
    constructor(private route: Router) { }
  
    ngOnInit() {
  
}


}
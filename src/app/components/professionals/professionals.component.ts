import { Component, OnInit } from '@angular/core';
import {Professional} from '../../models/professional';
import {ProfessionalService} from '../../service/professional.service';
import {Vacancy} from '../../models/vacancy';

@Component({
  selector: 'app-professionals',
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.scss']
})
export class ProfessionalsComponent implements OnInit {
  professionals:Professional[]=[];

  constructor(private professionalService:ProfessionalService) { }

  ngOnInit() {
    let self=this;
    this.professionalService.getProfessionals().once('value').then(function(professionals){

      professionals.forEach(professional=>{

        const currentProfessional = professional.toJSON() as Professional;
        console.log(currentProfessional);
        self.professionals.push(currentProfessional);
      })



    });
  }

}

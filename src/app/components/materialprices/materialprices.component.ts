import { Component, OnInit } from '@angular/core';
import {NzMarks} from 'ng-zorro-antd';
import {Bid} from '../../models/bid';
import {MaterialpriceService} from '../../service/materialprice.service';
import {Material} from '../../models/material';




@Component({
  selector: 'app-materialprices',
  templateUrl: './materialprices.component.html',
  styleUrls: ['./materialprices.component.scss']
})
export class MaterialpricesComponent implements OnInit {
  public data=['','','',''];
  disabled = false;
  value1 = 30;
  value2 = [20, 50];
  // marks: NzMarks = {
  //   0: '0°C',
  //   26: '26°C',
  //   37: '37°C',
  //   100: {
  //     style: {
  //       color: '#f50'
  //     },
  //     label: '<strong>100°C</strong>'
  //   }
  // };

  changeMarks(): void {
    //   this.marks = {
    //     20: '20%',
    //     99: '99%'
    //   };
    // }
  }
  constructor(private materialPriceService:MaterialpriceService) { }
  materials:Material []=[];
  ngOnInit() {
    let self=this;
    this.materialPriceService.getMaterials().once('value').then(function(materials){

      materials.forEach(material=>{

        const currentMaterial = material.toJSON() as Material;
        self.materials.push(currentMaterial);
      })



    });
  }

}

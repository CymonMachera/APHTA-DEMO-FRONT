import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { ClientsService } from '../_service/clients.service';

export interface clientArray {
  id: any;
  first_name: any;
  middle_name: any;
  last_name: any;
  sex: any;
  tel: any;
  age: any;
  region: any;
  district: any;
  ward: any;
  street: any;
  circumcision_status: any;
  validation_status: any;
  
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  age_group_values: any[]

  constructor(
    private clientsService : ClientsService,
    private fb: FormBuilder,
  ){}

  chartOption : EChartsOption
  chartOption2 : EChartsOption
  
  filter_form = this.fb.group({
    region: ['']
  })

  region 
  district
  facility

  regionValue
  districtValue

  Clint_data: clientArray[]
  region_data: clientArray[]

  dynamicData
  ngOnInit(){
    this.allClients()
    }
    
    allClients(){
      this.clientsService.allClients().subscribe(client =>{
        this.Clint_data = client
        let res = this.Clint_data.filter(it => it.age >=15 && it.age <20)
        let reso = this.Clint_data.filter(it => it.age >=20 && it.age <25)
        let reson = this.Clint_data.filter(it => it.age >=25 && it.age <30)
        let resoni = this.Clint_data.filter(it => it.age >=30)

        // Create an array containing the values of the age groups
        let   age_group: any[] ;
        age_group = [res.length, reso.length, reson.length, resoni.length]
        this.age_group_values = age_group
        
        // count values in a particular location
        const groupByLocaton = this.Clint_data.reduce((acc, it) => {
          acc[it.region] = acc[it.region] + 1 || 1;
          return acc;
        }, {});
        console.log(groupByLocaton)
        this.region = groupByLocaton

        this.chartOption= {
          tooltip : {
            trigger: 'axis'
          },
          legend: {
              top: '5%',
              left: 'center'
          },
          yAxis: {
            type: 'category',
            data: ['15 - 19', '20 - 24', '25 - 29', '30+'],
          },
          xAxis: {
            type: 'value',
          },
          series: [
            {
              data: this.age_group_values,
              type: 'bar',
              
            },
          ],
        };

        this.chartOption2= {
          tooltip : {
            trigger: 'axis'
          },
          legend: {
              top: '5%',
              left: 'center'
          },
          yAxis: {
            type: 'category',
            data: Object.keys(groupByLocaton),
            
            axisLabel: {
              interval: 0,
              rotate: 30 //If the label names are too long you can manage this by rotating the label.
              
            }
          },
          xAxis: {
            type: 'value',
          },
          series: [
            {
              data: Object.values(groupByLocaton),
              type: 'bar',
              
            },
          ],
        };


      })
    }
  

    onChangeRegion(regionValue: any) {
      if (regionValue) {
        
            this.regionValue = regionValue;
            this.districtValue = null;

            console.log("the valu is ", regionValue)

            // Dealing with districts
        this.region_data = this.Clint_data.filter(it => it.region == this.regionValue)

        const groupByDistrict = this.region_data.reduce((acc, it) => {
          acc[it.district] = acc[it.district] + 1 || 1;
          return acc;
        }, {});
        console.log(groupByDistrict)
        this.district = groupByDistrict

       let  y_axis = {
          type: 'category',
          data: Object.keys(groupByDistrict),
          
          axisLabel: {
            interval: 0,
            rotate: 30 //If the label names are too long you can manage this by rotating the label.
            
              }
          }

        let  series = [
            {
              data: Object.values(groupByDistrict),
              type: 'bar',
              
            },
          ]
        
        this.dynamicData = this.chartOption2
        this.dynamicData.series = [];
        this.dynamicData.series.push(series); 
       
          
      } else {
        this.regionValue = null;
        this.districtValue = null;
      }
    }

}

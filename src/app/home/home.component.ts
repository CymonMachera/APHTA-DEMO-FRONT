import { Component, OnInit } from '@angular/core';
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
    region: [''],
    district: ['']
  })

  region 
  district
  ward

  regionValue
  districtValue
  wardValue

  Clint_data: clientArray[]
  region_data: clientArray[]
  district_data: clientArray[]
  ageValue: clientArray[]
  dynamicData
  dynamicData_age

  ageGroups(client){
    this.ageValue = client
    let res = this.ageValue.filter(it => it.age >=15 && it.age <20)
    let reso = this.ageValue.filter(it => it.age >=20 && it.age <25)
    let reson = this.ageValue.filter(it => it.age >=25 && it.age <30)
    let resoni = this.ageValue.filter(it => it.age >=30)

    // Create an array containing the values of the age groups
    let   age_group: any[] ;
    age_group = [res.length, reso.length, reson.length, resoni.length]
    this.age_group_values = age_group
  }

  // Function to plot the initial graph
  initialGraphs(value1, value2){
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
        data: value1,
        
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
          data: value2,
          type: 'bar',
          
        },
      ],
    };
  }

  // Function to Update the age graph
  updateGraph1(){
    this.dynamicData_age = {
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
          data: this.age_group_values,
          type: 'bar',
          
        },
      ],
    }
  }
  // Function to update the location graph
  updateGraph2(value1, value2){
    this.dynamicData = {
      tooltip : {
        trigger: 'axis'
      },
      legend: {
          top: '5%',
          left: 'center'
      },
      yAxis: {
        type: 'category',
        data: value1,
        
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
          data: value2,
          type: 'bar',
          
        },
      ],
    }
  }
 
  ngOnInit(){
    this.allClients()
    }
    
    allClients(){
      this.clientsService.allClients().subscribe(client =>{
        this.Clint_data = client
        this.ageGroups(client)
        
        // count values in a particular location
        const groupByLocaton = this.Clint_data.reduce((acc, it) => {
          acc[it.region] = acc[it.region] + 1 || 1;
          return acc;
        }, {});
      
        this.region = groupByLocaton

        // Plot initial Graphs
        this.initialGraphs(Object.keys(groupByLocaton),Object.values(groupByLocaton))
      })
    }
  

    onChangeRegion(regionValue: any) {
      if (regionValue) {
        
        this.regionValue = regionValue;
        this.districtValue = null;
        
            // Dealing with districts
        this.region_data = this.Clint_data.filter(it => it.region == this.regionValue)

        const groupByDistrict = this.region_data.reduce((acc, it) => {
          acc[it.district] = acc[it.district] + 1 || 1;
          return acc;
        }, {});
  
        this.district = groupByDistrict
 
        this.updateGraph2(Object.keys(groupByDistrict), Object.values(groupByDistrict))

        // Deal wiht age groups
        this.ageGroups(this.region_data)
        this.updateGraph1()
      } else {
        this.regionValue = null;
        this.districtValue = null;
      }
    }

    onChangeDistrict(districtValue: any) {
      if (districtValue) {
        
        this.districtValue = districtValue;
  
        // Dealing with Wards
        this.district_data = this.region_data.filter(it => it.district == this.districtValue)

        const groupByWard = this.district_data.reduce((acc, it) => {
          acc[it.ward] = acc[it.ward] + 1 || 1;
          return acc;
        }, {});
        // Update the  graph 
        this.updateGraph2(Object.keys(groupByWard), Object.values(groupByWard))
        // Deal wiht age groups
        this.ageGroups(this.district_data)
        this.updateGraph1()
      } else {
        this.districtValue = null;       
      }
    }
}

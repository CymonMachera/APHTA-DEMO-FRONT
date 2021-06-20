import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChwService } from 'src/app/_service/chw.service';

export interface chwArray {
  id: any;
  first_name: any;
  middle_name: any;
  last_name: any;
  email: any;
  roles: any;
  user: any;
  date_joined: any;
  status: any;
  position: any;
  tel: any;
}
@Component({
  selector: 'app-selected-chw',
  templateUrl: './selected-chw.component.html',
  styleUrls: ['./selected-chw.component.scss']
})
export class SelectedChwComponent implements OnInit {

  constructor(
    private router: Router, 
    private chwService: ChwService,
    private route: ActivatedRoute) { }

  // chw details area
  chwId : number;
  chwData: chwArray;

  ngOnInit(): void {
  this.chwId = this.route.snapshot.params['id'];
  this.getchw()
  }

  // This is for chw details child

  getchw(){
    this.chwService.findChw(this.chwId).subscribe(data => 
      { this.chwData = Object.assign({}, ...data)
        this.chwData.date_joined = this.chwData.date_joined.split("T")[0]
      });
  }

  editchw(id){  
    this.router.navigate(["/chw/form",id]); 
  }
}

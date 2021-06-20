import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ChwService } from '../_service/chw.service';

export interface staffArray {
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
  selector: 'app-chw',
  templateUrl: './chw.component.html',
  styleUrls: ['./chw.component.scss']
})
export class ChwComponent implements AfterViewInit {


  displayedColumns: string[] = ['id', 'first_name', 'middle_name', 'last_name','position','tel',
  'email', 'status',];
  dataSource: MatTableDataSource<staffArray>;

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

memberValue: staffArray[];

  constructor(private router: Router, private route:ActivatedRoute, private chwService: ChwService) {
     // Assign the data to the data source for the table to render
     this.dataSource = new MatTableDataSource(this.memberValue);
   }

  ngAfterViewInit(): void {
    this.allChws();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) { 
      this.dataSource.paginator.firstPage();
    }
  }
    // On clicking the row data, load this method
    selectedChw(id) {
      this.router.navigate(['/chw', id]);  //this for navigation with id
    } 
    // Staff registration function
    registerChw(){
      this.router.navigateByUrl('/chw/form');
    }
    // Below are service access methods for CRUID
    allChws(){
      this.chwService.allChws().subscribe(chws => this.dataSource.data = chws);
    }
}

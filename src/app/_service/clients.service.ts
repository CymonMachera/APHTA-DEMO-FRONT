import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const BASE_URL = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private model = 'clients/';       // all clients

  constructor(private http: HttpClient){}

  allClients(){
    return this.http.get<any>(this.geturl())
  }

  // findClub(clubId){
  //   return this.http.get<any>(this.geturl()+clubId+'/')
  // }
  // findClubMembers(clubId){
  //   return this.http.get<any>(`${BASE_URL}${this.model}`+clubId+'/member/')
  // }
  // findClubSupervisor(clubId){
  //   return this.http.get<any>(`${BASE_URL}${this.model}`+clubId+'/supervisor/')
  // }

  // createClub(club){
  //   return this.http.post<any>(this.geturl(), club)
  // }
  // updateClub(clubID, data){
  //   return this.http.put<any>(this.geturl()+clubID+'/', data)
  // }
  // deleteClub(clubId){
    
  // }

  private geturl(){
    return `${BASE_URL}${this.model}`;
  }
}

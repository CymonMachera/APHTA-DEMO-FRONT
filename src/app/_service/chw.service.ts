import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class ChwService {

  private model = 'chw/'
  constructor(private http: HttpClient) { }

  allChws(){
    return this.http.get<any>(this.geturl(),)
  }

  findChw(ChwId){
    return this.http.get<any>(this.geturl()+ChwId+'/')
  }

  createChw(Chw){
    return this.http.post<any>(this.geturl(), Chw)
  }
  updateChw(ChwID, data){
    return this.http.put<any>(this.geturl()+ChwID+'/', data)
  }
  createChwProfile(ChwProfile){
    return this.http.post<any>(this.geturl()+'profile/',ChwProfile)
  }
  updateChwProfile(ChwProfileID, data){
    return this.http.put<any>(this.geturl()+'profile/'+ChwProfileID+'/', data)
  }

  private geturl(){
    return `${BASE_URL}${this.model}`;
  }
}

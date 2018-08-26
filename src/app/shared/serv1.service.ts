import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';// very important!
import { UserService } from '../shared/user.service';
@Injectable()
export class Serv1Service {

  

  constructor(private http:Http, private userService: UserService) { }// now the service realize http variable

  cars = [
    'Ford', 'Chevrolet','Buick'
  ];

  getUserName(){
    return this.userService.myUserName;
  }

  myData(){
    return 'This is my data, man!';
  }

  getDataFromServer(urlApi:string){
    return this.http.get(urlApi).map(response => response.json())// Get and map the response in other words parsing(json)[return respornse.json()]
  }

  setDataFromServer(urlApi:string, name:string){
    return this.http.post(urlApi,name).map(response => response.json());
  }

  deleteDataFromServer(urlApi:string){
    return this.http.delete(urlApi).map(response => response.json());
  }

  addDataFromServer(urlPath: string, value:string){
    return this.http.put(urlPath,value).map(response => response.json());
  }
}
/*
class ItemData{// it's an interface
  //id:number;
  user_id:number;// it was number before
  user_name:string;
  //body?:string;// ? means we don't know exactly if we need the variable
  user_password:string;

  //get viewId():number { return this.id; }
}
*/
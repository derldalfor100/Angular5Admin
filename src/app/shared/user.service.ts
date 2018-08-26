import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';

@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:35257';

  myUserName:string;

  constructor(private http: HttpClient) { }

  registerUser(user: User,roles : string[]) {// to register a new user
    const body = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Roles : roles
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});// without authentication
    return this.http.post(this.rootUrl + '/api/User/Register', body,{headers : reqHeader});
  }

  userAuthentication(userName, password) {// to authenticate using token, through Http - post method: http://localhost:35257/token
    this.myUserName = userName;// to use the userName later
    console.log(this.myUserName);
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }

  getUserClaims(){
   return  this.http.get(this.rootUrl+'/api/GetUserClaims');
  }

  getAllRoles() {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get(this.rootUrl + '/api/GetAllRoles', { headers: reqHeader });
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;// initiate isMatch to false
    var userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
    // userRoles = the userRoles item from the token after parsing from JSON to string[]
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {// then we've a match between one of the user roles to the allowedRoles
        isMatch = true;// se we've a match
        return false;// then exit from 'forEach'
      }
    });
    return isMatch;// return if we've a match or not

  }

  getUser(userName:string){
    return  this.http.get(this.rootUrl+'/api/GetUser/' + userName);
  }

  updateUser(userName:string, flag:number, parameter:string){
    return  this.http.put(this.rootUrl+'/api/update/' + userName + '/' + flag + '/' + parameter ,"");
  }

  deleteRole(userName:string){
    return  this.http.delete(this.rootUrl+'/api/DeleteRole/' + userName);
  }

  deleteUser(userName:string){
    return  this.http.delete(this.rootUrl+'/api/DeleteUser/' + userName);
  }
}

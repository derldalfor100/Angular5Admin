import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { Serv1Service } from './../../shared/serv1.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;// the user' details
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  roles : any[];// roles[0] = true is for 'Admin',  roles[1] = true is for 'Consumer'
  max : MaxID[];
  check : Check;

  constructor(private userService: UserService, private toastr: ToastrService, private dataService:Serv1Service) { }

  ngOnInit() {
    this.resetForm();
    this.userService.getAllRoles().subscribe(
      (data : any)=>{
        data.forEach(obj => {obj.selected = false});
        data.forEach(obj => {if(obj.Name == "Consumer") obj.selected = true});
        this.roles = data;// retrieve the roles{Id, Name} and sign as selected only where Name = "Consumer"
      }
    );
  }

  resetForm(form?: NgForm) {// reset the user and the selection f the roles
    if (form != null)
      form.reset();
    this.user = {
      UserName: '',
      Password: '',
      Email: '',
      FirstName: '',
      LastName: ''
    }
    if (this.roles)
      this.roles.map(x => x.selected = false);
  }

  OnSubmit(form: NgForm) {
    var x = this.roles.filter(x => x.selected).map(y => y.Name);
    //debugger
    this.userService.registerUser(form.value,x)
      .subscribe((data: any) => {
        //debugger
        if (data.Succeeded == true) {
          this.getCurrentMaxId(this.user.UserName);// first calc the maxId then: add the user to MySql Server
          this.resetForm(form);
          this.toastr.success('User registration successful');// a meesage which indiactes success
          this.userService.getAllRoles().subscribe(
            (data : any)=>{
              data.forEach(obj => {obj.selected = false});
              data.forEach(obj => {if(obj.Name == "Consumer") obj.selected = true});
              this.roles = data;// retrieve the roles{Id, Name} and sign as selected only where Name = "Consumer"
            }
          );
        }
        else
          this.toastr.error(data.Errors[0]);// a message which indicates error
      });
  }

  updateSelectedRoles(index) {
    this.roles[index].selected = !this.roles[index].selected;
    if(this.roles[index].selected)// if we've selected Admin then:
      this.roles[1].selected = false;// is not a Consumer
    else
      this.roles[1].selected = true;// is a Consumer
  }

  onSubmitMrRobot(userName:string){
    this.dataService.setDataFromServer("http://localhost:52678/api/user/set-users-pass/" + userName + "/" + this.max[0].count, "").subscribe((response: Check)=>{
      this.check = response;
      console.log(this.check);
    })
  }

  getCurrentMaxId(userName:string){
    this.dataService.getDataFromServer("http://localhost:52678/api/user/get-users-pass/" + 5).subscribe((response: MaxID[])=>{
      this.max = response;// after get and subscribe we got the info in response, we put response into this.max
      console.log(this.max[0].count);
      this.onSubmitMrRobot(userName);
    })
  }
}

class MaxID{
  count:number;
}

class Check{
  state:boolean
}
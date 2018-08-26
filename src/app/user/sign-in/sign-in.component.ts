import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError : boolean = false;
  constructor(private userService : UserService,private router : Router) { }

  ngOnInit() {
  }

  OnSubmit(userName,password){
     this.userService.userAuthentication(userName,password).subscribe((data : any)=>{
      localStorage.setItem('userToken',data.access_token);// save the login token in the local storage
      localStorage.setItem('userRoles',data.role);// save the role of the user in the local storage 
      this.router.navigate(['/home']);// navigate to /home 
    },
    (err : HttpErrorResponse)=>{// when the password or the username is wrong
      this.isLoginError = true;
    });
  }

}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../shared/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router : Router,private userService : UserService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {// because the implementation we have to fill this method
      //the method get get as input: next, state nad return boolean
      if (localStorage.getItem('userToken') != null)// if we've a token then
      {
        let roles = next.data["roles"] as Array<string>;// allowed roles to access the page/component
        if (roles) {// if rolls != null
          var match = this.userService.roleMatch(roles);// if we've a match between the roles of the user and the allowed rolls
          if (match) return true;// then return true
          else {
            this.router.navigate(['/forbidden']);// else navigate to: /forbidden 
            return false;// and return false
          }
        }
        else
          return true;// else, any user no matter the roles he got - can access, therefore return true
      }
      this.router.navigate(['/login']);// it occurs when the user haven't log-in yet
      return false;
  }
}

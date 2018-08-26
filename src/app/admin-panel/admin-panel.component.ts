import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {

  }

  Back() {
    this.router.navigate(['/home']);
  }
  
  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

}

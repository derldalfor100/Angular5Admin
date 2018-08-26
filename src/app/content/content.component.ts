import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

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

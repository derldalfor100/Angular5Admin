import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-consumer-panel',
  templateUrl: './consumer-panel.component.html',
  styleUrls: ['./consumer-panel.component.css']
})
export class ConsumerPanelComponent implements OnInit {

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

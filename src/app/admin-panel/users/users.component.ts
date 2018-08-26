import { UserService } from './../../shared/user.service';
import { Serv1Service } from './../../shared/serv1.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  data:IData[];
  info:any;
  clicked:boolean;
  fname:string="";
  lname:string="";
  selectedID:number;
  selectedI:number;
  refresh:any;

  constructor(private dataService:Serv1Service, private userService: UserService) { }

  ngOnInit() {
    this.dataService.getDataFromServer("http://localhost:52678/api/user/get-users-pass/").subscribe((response: IData[])=>{// get the items in the store
    this.data = response;// after get and subscribe we got the info in response, we put response into this.data
    this.clicked = false;
    this.refresh = new Array(this.data.length);
    for(let r of this.refresh){
      r = false;
    }
  });
  }

  disable(fLength:number, lLength:number){
    if(fLength > 2 && lLength > 2){
      console.log(true);
      return false;
    }
    console.log(false);
    return true;
  }

  onClick(userName:string, id:number, index:number){
    console.log(userName);
    this.selectedID = id;
    console.log(id);
    
    if(this.userService.roleMatch(['Admin']))
    {
        this.userService.getUser(userName).subscribe((response: any) => {
          this.info = response;
          console.log(this.info);
          this.clicked = true;
          this.selectedI = index;
          this.refresh[index] = false;
        });
    }

    
    
  }
  onRole(userName:string){
    this.userService.deleteRole(userName).subscribe((response: any) => {
      console.log(response);
      this.userService.updateUser(userName, 8, this.info.Roles[0]).subscribe((response: any) => {
        console.log(response);
        if(response.Succeeded){
          if(this.info.Roles[0] == "Admin")
            this.info.Roles[0] = "Consumer";
          else
            this.info.Roles[0] = "Admin";
        }
      })
    })
    /*
    */
  }

  onName(userName:string){
    console.log(this.fname +", " + this.lname);
    this.userService.updateUser(userName, 3, this.fname).subscribe((response: any) => {
      console.log(response);
      if(response.Succeeded){
        this.info.FirstName = this.fname;
      }
      this.userService.updateUser(userName, 4, this.lname).subscribe((response: any) => {
        console.log(response);
        if(response.Succeeded){
          this.info.LastName = this.lname;
        }
      })
    })
  }
  onDelete(userName:string){
    this.dataService.deleteDataFromServer("http://localhost:52678/api/user/delete-user-pass/" + this.selectedID).subscribe((response: IData[])=>{// get the items in the store
      console.log(response);
      this.userService.deleteUser(userName).subscribe((response: any) => {
        console.log(response);
        this.clicked = false;
        this.refresh[this.selectedI] = true;
      })
  });
  }
}

class IData{// it's an interface, need to change!
  id:number;
  name:string;
}


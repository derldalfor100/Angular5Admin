
import { UserService } from './../../shared/user.service';
import { Serv1Service } from './../../shared/serv1.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  data:IData[];
  myId:MyID[];
  check:Check;
  userClaims: any;
  hideme:boolean[];
  checkExist:CheckExist[];

  
  //quantity:number;

  constructor(private dataService:Serv1Service, private userService: UserService) { }

  ngOnInit() {

    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;
      console.log(this.userClaims);
      this.dataService.getDataFromServer("http://localhost:52678/api/user/get-user-id/" + this.userClaims.UserName).subscribe((response: MyID[])=>{
        this.myId = response;// after get and subscribe we got the info in response, we put response into this.myId
        console.log(this.myId[0]);

        this.dataService.getDataFromServer("http://localhost:52678/api/user/get-store/").subscribe((response: IData[])=>{// get the items in the store
          this.data = response;// after get and subscribe we got the info in response, we put response into this.data
          this.hideme = new Array(this.data.length);

          let k:number = 0;

          for(let d of this.data){// initialize all to true
            this.hideme[k] = true;
            k++;
          }

          let j:number = 0;// as a index for hideme

          for(let d of this.data){
            this.initializeFalses(j, d.id);
            j++;
          }
          })
        })
    });

    
    /*this.dataService.getDataFromServer("http://localhost:52678/api/user/get-store/").subscribe((response: IData[])=>{// get the items in the store
    this.data = response;// after get and subscribe we got the info in response, we put response into this.data
    this.hideme = new Array(this.data.length);

    let j:number = 0;// as a index for hideme
    for(let d of this.data){
      this.initializeFalses(j, d.id);
    }
    })*/
   
  }

  onClick(itemID:number, amount:number, i:number){
    //this.dataService.getDataFromServer("http://localhost:52678/api/user/get-user-id/" + this.userClaims.UserName).subscribe((response: MyID[])=>{
     // this.myId = response;// after get and subscribe we got the info in response, we put response into this.myId
     // console.log(this.myId[0]);

      this.dataService.setDataFromServer("http://localhost:52678/api/user/set-item/" + itemID + "/"+ this.myId[0].id + "/" + amount, "").subscribe((response: Check)=>{
        this.check = response;// after get and subscribe we got the info in response, we put response into this.check
        console.log(this.check);
        })
      //})

      this.hideme[i] = true;
  }
  
  initializeFalses(index:number, selectedItemId:number){
      this.dataService.getDataFromServer("http://localhost:52678/api/user/get-exist/"+ selectedItemId + "/" + this.myId[0].id).subscribe((response:CheckExist[])=>{
      this.checkExist = response;

      //console.log(this.checkExist[0]);
      if(this.checkExist[0].state == "false")
        this.hideme[index] = false;
      //else
      //this.hideme[index] = true;
      console.log("status " + index + ": " + this.hideme[index]);
    })
  }

}

class IData{// it's an interface
  id:number;
  name:string;
  cost:number;
  description:string;
}

class MyID{
  id:number;
}

class Check{
  state:boolean
}

class CheckExist{
  state:any
}
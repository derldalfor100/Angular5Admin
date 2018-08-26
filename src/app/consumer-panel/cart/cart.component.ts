import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Serv1Service } from './../../shared/serv1.service';
import { UserService } from './../../shared/user.service';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  data:IData[];
  userClaims: any;
  myId:MyID[];
   	
  checks:boolean[] = new Array();
  numItems:number = 0;
  check:Check;

  constructor(private dataService:Serv1Service, private userService: UserService, private cdRef:ChangeDetectorRef) { }

  ngOnInit() {
     	
    //this.checks.splice(1, 1);// delete 1 element at index = 1

    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;
      console.log(this.userClaims);

      this.dataService.getDataFromServer("http://localhost:52678/api/user/get-user-id/" + this.userClaims.UserName).subscribe((response: MyID[])=>{
        this.myId = response;// after get and subscribe we got the info in response, we put response into this.myId
        console.log(this.myId[0]);

        this.dataService.getDataFromServer("http://localhost:52678/api/user/get-basket/" + this.myId[0].id).subscribe((response: IData[])=>{// get the items in the store
        this.data = response;// after get and subscribe we got the info in response, we put response into this.data
        console.log(this.data);

        this.numItems = this.data.length;

        this.initializeFalses();
        
        });
      });
    });


  }

  initializeFalses(){
    for(let d of this.data){
      this.checks.push(true);
    }
    //this.checks[0] = !this.checks[0];
  }

  onRemove(index:number, selectedItemId:number, d:IData){
    this.dataService.deleteDataFromServer("http://localhost:52678/api/user/delete-item/" + selectedItemId + "/" + this.myId[0].id).subscribe((response: Check)=>{// get the items in the store
        this.check = response;// after get and subscribe we got the info in response, we put response into this.data
        if(this.check){
          //this.cdRef.detectChanges();
          d.amount = 0;
          toast('Removed', 2000, 'rounded');
        }
        console.log("status: " + this.check);
        console.log("index:" + index);
    });

    this.checks[index] = !this.checks[index];
    this.numItems--;
  }

  onChange(itemID:number, amount:number){
    this.dataService.addDataFromServer("http://localhost:52678/api/user/change-item/" + itemID + "/"+ this.myId[0].id + "/" + amount, "").subscribe((response: Check)=>{
        this.check = response;// after get and subscribe we got the info in response, we put response into this.check
        if(this.check){
          toast('The Amount Changed to ' + amount, 2000, 'rounded');
        }
        console.log(this.check);
        })
  }

  onBuy(){
    let index:number = 0;
    let sum:number = 0;
    for(let d of this.data){
      this.dataService.deleteDataFromServer("http://localhost:52678/api/user/delete-item/" + d.itemid + "/" + this.myId[0].id).subscribe((response: Check)=>{// get the items in the store
      this.check = response;// after get and subscribe we got the info in response, we put response into this.data
      console.log("status: " + this.check);
      //if(this.checks[index]){
        sum += d.cost * d.amount;
      //}
      if(this.check && this.data.length -1 == index){
        toast('Thanks. U paid: ' + sum + '$', 2000, 'rounded');
      }
      this.checks[index] = false;
      index++;
      });
    }
    
    this.numItems = 0;
  }

}

class IData{// it's an interface
  itemid:number;
  name:string;
  cost:number;
  amount:number;
  description:string;
}

class MyID{
  id:number;
}

class Check{
  state:boolean
}
import { Serv1Service } from './../../shared/serv1.service';
import { Component, OnInit, ChangeDetectorRef, Renderer2, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Location } from '@angular/common';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  data:IData[];
  maxId:number=-1;
  count:any[] = new Array(1);
  extra:IData = new IData;
  //@ViewChild('item') d1:ElementRef;
  //@ViewChild('inner') d2:ElementRef;

  constructor(private dataService:Serv1Service, private cdRef:ChangeDetectorRef) { 
    this.extra.id = this.maxId + 1;
    this.extra.name = "";
    this.extra.cost = null;
    this.extra.description = " ";
  }

  init(){
    this.dataService.getDataFromServer("http://localhost:52678/api/user/get-store/").subscribe((response: IData[])=>{// get the items in the store
    this.data = response;// after get and subscribe we got the info in response, we put response into this.data
    this.maxId = -1;
    for(let d of this.data){
      if(this.maxId < d.id){
          this.maxId = d.id;
      }
    }

    this.extra.id = this.maxId + 1;
    this.extra.name = "";
    this.extra.cost = null;
    this.extra.description = " ";
    console.log(this.extra);
  })
  }

  ngOnInit() {
    this.init();
  }

  onClick(itemId:number){
    this.dataService.deleteDataFromServer("http://localhost:52678/api/user/delete-store/" + itemId).subscribe((response:any)=>{
      if(response){
        toast('Removed', 2000, 'rounded');

        this.init();
        this.cdRef.detectChanges();
      }
    })
  }

  onAdd(){
    this.dataService.setDataFromServer("http://localhost:52678/api/user/add-item/" + this.extra.id + "/" + this.extra.name + "/" + this.extra.cost + "/" + this.extra.description, "").subscribe((response:any)=>{
      if(response){
        toast('Added', 2000, 'rounded');

        this.init();
        this.cdRef.detectChanges();
      }
    })


   //this.maxId++;

   console.log(this.extra);
   //this.count.push(1);
   //this.cdRef.detectChanges();// need to use that on
  }

  onUpdate(param:number, id:number, value:any){
    if(param == 20 && value.length > 2){
      this.dataService.addDataFromServer("http://localhost:52678/api/user/update-item/" +param + "/" + id + "/" + value + "/" + 0, "").subscribe((response:any)=>{
      if(response){
        toast('The Name Updated to ' + value, 2000, 'rounded');
        //this.cdRef.detectChanges();
      }
      })
    }else if(param == 21 && value > 0){
      this.dataService.addDataFromServer("http://localhost:52678/api/user/update-item/" +param + "/" + id + "/" + "a" + "/" + value, "").subscribe((response:any)=>{
        if(response){
          toast('The Cost Updated to ' + value, 2000, 'rounded');
          //this.cdRef.detectChanges();
        }
      })
    }else if(param == 22){
      this.dataService.addDataFromServer("http://localhost:52678/api/user/update-item/" +param + "/" + id + "/" + "a" + "/" + 0 + "/" + value, "").subscribe((response:any)=>{
        if(response){
          toast('Description Updated', 2000, 'rounded');
          //this.cdRef.detectChanges();
        }
      })
    }else if(param == 20 && value.length < 3){
      toast('Please Enter At Least 3 Letters', 2000, 'rounded');
    }else if(param == 21 && !(value > 0)){
      toast('Please Enter a Positive Number', 2000, 'rounded');
    }
  }

  disable(){
    if(this.extra.name.length > 2 && this.extra.cost > 0){
      //console.log(true);
      return false;
    }
    //console.log(false);
    return true;
  }
}

class IData{// it's an interface
  id:number;
  name:string;
  cost:number;
  description:string;
}
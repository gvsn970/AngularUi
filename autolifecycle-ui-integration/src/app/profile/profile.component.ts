
import { Component, OnInit } from '@angular/core';
import { AutoService } from '../auto.service';
import {  Router } from '@angular/router';
declare var jquery:any; // not required
declare var $ :any; // not required

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  productLine;
  LogoUrl;
  id;
   
  
  constructor( private autoService:AutoService,private router:Router ) { 

        
  }
 
  
      
  
  
      getLogo(pLId){


        this.id=this.autoService.getAllProductLineLogos(pLId)

         
        return this.id;
         
          
      }
    


  ngOnInit() {
    
    this.autoService.getAllProductLines().subscribe(
      data => {
        this.productLine=data;
        
      },
      err => {
        console.log("Error occured.")
      }
    );

    
  



  }

}


export interface ProductLine{

  product_line_id	:number,
  product_line_name	:string,
  product_line_desc	:string,
  delete_status	:number,
  count	:number,
  product_name	:string,
  product_id	:number
}


export interface Product{
  
  product_line_id	:number,
  product_line_name	:string,
  product_line_desc	:string,
  product_desc	:string,
  product_name	:string,
  product_id	:number
}

export interface Release{
  
releaseId:number,
fkProductId:number,
productName	:string,
releaseName	:string,
releaseDateInternal	:string,
releaseDateExternal	:string,
releaseDescription	:string,
fkReleaseOwner	:number,
fkStatusId	:number,
productLineName	:string,
status	:string,
owner	:string
}

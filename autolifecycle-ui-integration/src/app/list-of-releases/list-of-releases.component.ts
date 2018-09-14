import { Component, OnInit } from '@angular/core';
import { AutoService } from '../auto.service';
import {  Router } from '@angular/router';
import {  HttpResponse} from '@angular/common/http'; 
declare var jquery:any; // not required
declare var $ :any; // not required


@Component({
  selector: 'app-list-of-releases',
  templateUrl: './list-of-releases.component.html',
  styleUrls: ['./list-of-releases.component.css']
})
export class ListOfReleasesComponent implements OnInit {

  constructor(private autoService:AutoService,private router:Router) { }
   release;
  rid;
  Edit:boolean=false;
  no_release:boolean=false;

  onEdit(){
    this.Edit=true;
  }

  selectedFiles: File[]=[];
  onShipped(item){

    item.fkStatusId=4;
    console.log(this.selectedFiles,item.fkProductId,item.releaseId ,item.releaseName,item.releaseDescription,item.releaseDateInternal,item.releaseDateExternal,item.fkStatusId);
    this.autoService.updateReleasestatus(this.selectedFiles,item.fkProductId,item.releaseId ,item.releaseName,item.releaseDescription,item.releaseDateInternal,item.releaseDateExternal,item.fkStatusId).subscribe(
      event => {

     if (event instanceof HttpResponse) {

        console.log(event);
        if(event.status==200){
          item.fkStatusId=4;
        }

      }
       
      err => {
        console.log("Error occured.");
      }
      

    });

  }

  onRelease(rid){
    this.rid=rid;
  }
  onDelete(){
    console.log(this.rid)
    this.autoService.deleteRelease(this.rid).subscribe(
      data => {
        console.log(data);
         
      },
      err => {
        console.log("Error occured.")
      },
      ( )=>{
        
        this.ngOnInit();
      }

    );
    //  $('#modal_close').trigger('click');
    $('.modal').removeClass('show');
    $('.modal-backdrop').removeClass('modal-backdrop');
    $('body').removeClass('modal-open');
    $('body').prop('style',' ');
     
   
   
     
  }
  ngOnInit() {


    
    
 
    this.autoService.getAllReleases().subscribe(
      data => {
        this.release=data;
        console.log(data)
         
      },
      err => {
        console.log("Error occured.")
      },
      ()=>{
        if(this.release.length==0){

            this.no_release=true;

        }
      }
    );


   


  }

  

}

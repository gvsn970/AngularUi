 import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { AutoService } from '../auto.service';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
declare var jquery:any;
declare var $ :any; 


@Component({
  selector: 'app-sync-products',
  templateUrl: './sync-products.component.html',
  styleUrls: ['./sync-products.component.css']
})
export class SyncProductsComponent implements OnInit {

  constructor(private autoService:AutoService, private route: ActivatedRoute,
    private router: Router,private http:HttpClient ) { 


      this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
     }
  
     this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
         // trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
         // if you need to scroll back to top, here is the right place
         window.scrollTo(0, 0);
      }
  });

        
       
    }

    mapped_list;
    unmapped_list;
    boards_list;
    message;
    is_success:boolean;
    is_fail:boolean;

    syncFromAuto(id,event): void{
      //$(this).closest('tr').find('.contact_name')
      this.is_success=false;
      this.is_fail=false;
      event.preventDefault();
      console.log("id "+id);
      let product_id=id;
      let i=1;
      this.autoService.syncProductFromAutoToJira(product_id).subscribe(
        data => {
          i++;
          console.log(data);
          if(data["type"]==4){

            let obj=JSON.parse(data["body"]);
            console.log(obj.message);
            this.message=obj.message;
            if(obj.status==1){
              this.is_success=true;
            }
            if(obj.status==0){
              this.is_fail=true;
            }
          }
          
          $('body').loading({
            message: 'Syncing to Jira...'
          });
          
 
          
        },
        err => {
          $('body').loading('stop');
          console.log(" Error occured.")
        },
        ()=>{
          console.log("completed")
          $('body').loading('stop');
          if(this.is_success){
            $('#'+id).attr('style','color: green');
          $('#'+id).append( "<p>Success</p>" );
          setTimeout(function(){$('#'+id+" p").empty();}, 3000);
          }
          if(this.is_fail){
            $('#'+id).attr('style','color: red');
            $('#'+id).append( "<p>Failed</p>" );
            setTimeout(function(){$('#'+id+" p").empty();}, 3000);
            }
        }
        
      );

    }


    syncFromJira(id,event): void{
      //$(this).closest('tr').find('.contact_name')
      this.is_success=false;
      this.is_fail=false;
      event.preventDefault();
      console.log("id "+id);
      let product_id=id;
      let i=1;
      this.autoService.syncProductFromJiraToAuto(product_id).subscribe(
        data => {
          i++;
          console.log(data);
          if(data["type"]==4){

            let obj=JSON.parse(data["body"]);
            console.log(obj.message);
            this.message=obj.message;
            if(obj.status==1){
              this.is_success=true;
            }
            if(obj.status==0){
              this.is_fail=true;
            }
          }
          
          $('body').loading({
            message: 'Syncing from Jira...'
          });
          
        },
        err => {
          $('body').loading('stop');
          console.log(" Error occured.")
        },
        ()=>{
            console.log("completed")
            $('body').loading('stop');
            if(this.is_success){
              $('#'+id).attr('style','color: green');
            $('#'+id).append( "<p>Success</p>" );
            setTimeout(function(){$('#'+id+" p").empty();}, 3000);
            }
            if(this.is_fail){
              $('#'+id).attr('style','color: red');
              $('#'+id).append( "<p>Failed</p>" );
              
              setTimeout(function(){$('#'+id+" p").empty();}, 3000);
              }
        }
        
      );

    }

    mapWithJira(product_id,board_id){

      console.log("prrr:"+product_id,board_id);
      this.autoService.mapProductwithJira(product_id,board_id).subscribe(
        data => {
           
          console.log(data);

        },
        err => {
          console.log(" Error occured.")
        },
        ()=>{
          this.ngOnInit();
        }
        
      );
    }

  ngOnInit() {

    this.autoService.getMappedProducts().subscribe(
      data => {
        this.mapped_list=data;
        
      },
      err => {
        console.log(" Error occured.")
      }
      
    );

    this.autoService.getUnMappedProducts().subscribe(
      data => {
        this.unmapped_list=data;
        
      },
      err => {
        console.log(" Error occured.")
      }
      
    );

    this.autoService.getAllBoardsFromJira(1).subscribe(
      data => {
        this.boards_list=data;
        
      },
      err => {
        console.log(" Error occured.")
      }
      
    );




  }

}

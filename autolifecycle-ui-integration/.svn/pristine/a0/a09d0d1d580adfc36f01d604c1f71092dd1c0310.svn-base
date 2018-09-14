import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { AutoService } from '../auto.service';
import{ AppComponent } from '../app.component'
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
declare var jquery:any; // not required
declare var $ :any; // not required
@Component({
  selector: 'app-sync-releases',
  templateUrl: './sync-releases.component.html',
  styleUrls: ['./sync-releases.component.css']
})
export class SyncReleasesComponent implements OnInit {

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
    sprints_list=[];
    message;
    is_success:boolean;
    is_fail:boolean;
    no_sprints:boolean=false;
    


    getSprints(product_id){
      this.sprints_list=[];
      this.no_sprints=false;
      $('body').loading({
        message: 'Fetching data...'
      });
      this.autoService.getAllSprintsFromJira(product_id).subscribe(
      
        data => {
          this.sprints_list=data["sprintModel"];
          console.log(this.sprints_list);
          if(this.sprints_list!=null && this.sprints_list[0].sprintId!=0){
              this.no_sprints=true;
          }

          
        },
        err => {
          console.log(" Error occured.")
        },
        ()=>{
          $('body').loading('stop');
        }
        
        
      );
  

    }

    syncFromAuto(id): void{
      //$(this).closest('tr').find('.contact_name')
      this.is_success=false;
      this.is_fail=false;
      console.log("id "+id);
      let release_id=id;
      let i=1;
      this.autoService.syncReleaseFromAutoToJira(release_id).subscribe(
        data => {
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

    syncFromJira(id,product_id): void{
      //$(this).closest('tr').find('.contact_name')
      console.log(id,product_id)
      this.is_success=false;
      this.is_fail=false;
      console.log("id "+id);
      let release_id=id;
      let i=1;
      this.autoService.syncReleaseFromJiraToAuto(release_id,parseInt(product_id)).subscribe(
        data => {
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
            message: 'Syncing From Jira...'
          });
          
 
           
 
          
        },
        err => {
          $('body').loading('stop');
          console.log(" Error occured.")
        },
        ()=>{
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

    mapWithJira(release_id){

      let product_id=$("."+release_id).attr('id');
      let sprint_id=$("."+release_id).val();
      this.autoService.mapReleasewithJira(product_id,sprint_id,release_id).subscribe(
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
     
    this.autoService.getMappedReleases().subscribe(
      data => {
        this.mapped_list=data;
        
      },
      err => {
        console.log(" Error occured.")
      }
      
    );

    this.autoService.getUnMappedReleases().subscribe(
      data => {
        this.unmapped_list=data;
        console.log(data);
      },
      err => {
        console.log(" Error occured.")
      }
      
    );

    



  }


}

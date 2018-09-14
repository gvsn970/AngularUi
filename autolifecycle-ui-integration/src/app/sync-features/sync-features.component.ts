import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AutoService } from '../auto.service';
declare var jquery: any; // not required
declare var $: any; // not required

@Component({
  selector: 'app-sync-features',
  templateUrl: './sync-features.component.html',
  styleUrls: ['./sync-features.component.css']
})
export class SyncFeaturesComponent implements OnInit {
  constructor(private autoService: AutoService, private route: ActivatedRoute,
    private router: Router, private http: HttpClient) {


    this.router.routeReuseStrategy.shouldReuseRoute = function () {
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
  issues_list = [];
  message;
  is_success:boolean;
  is_fail:boolean;
  no_issues:boolean=false;



  getIssues(release_id,type_id){
    this.issues_list=[];
    this.no_issues=false;
    console.log("R"+release_id,"T"+type_id);
    $('body').loading({
      message: 'Fetching Issues List...'
    });
    this.autoService.getAllIssuesBytype(release_id,type_id).subscribe(
    
      data => {
        this.issues_list=data["backLogsModel"];
        console.log(this.issues_list);

        if(this.issues_list!=null && this.issues_list[0].issueid!=0){
            this.no_issues=true;
        }
        
      },
      err => {
        $('body').loading('stop');
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
    let feature_id=id;
    let i=1;
    this.autoService.syncFeatureFromAutoToJira(feature_id).subscribe(
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

  syncFromJira(id): void{
    //$(this).closest('tr').find('.contact_name')
    this.is_success=false;
    this.is_fail=false;
    console.log("id "+id);
    let feature_id=id;
    let i=1;
    this.autoService.syncFeatureFromJiraToAuto(feature_id).subscribe(
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


  mapWithJira(feature_id) {
    let issue_id=$("."+feature_id).val();
    this.autoService.mapFeaturewithJira(feature_id,issue_id).subscribe(
      data => {

        console.log(data);

      },
      err => {
        console.log(" Error occured.")
      },
      () => {
        this.ngOnInit();
      }

    );
  }


  ngOnInit() {

    this.autoService.getMappedFeatures().subscribe(
      data => {
        this.mapped_list = data;

      },
      err => {
        console.log(" Error occured.")
      }

    );

    this.autoService.getUnMappedFeatures().subscribe(
      data => {
        this.unmapped_list = data;
        console.log(data);
      },
      err => {
        console.log(" Error occured.")
      }

    );





  }


}

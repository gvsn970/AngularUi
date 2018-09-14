import { Component, OnInit } from '@angular/core';
import { AutoService } from '../auto.service';
import { Router,NavigationEnd  } from '@angular/router';
import { HttpResponse} from '@angular/common/http'; 
declare var jquery:any; // not required
declare var $ :any; // not required

@Component({
  selector: 'app-jira',
  templateUrl: './jira.component.html',
  styleUrls: ['./jira.component.css']
})
export class JiraComponent implements OnInit {

  constructor(private autoService:AutoService,private router: Router) { 


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
  success_message:boolean=false;
  fail_message:boolean=false;
  jira_new:boolean=false;
  status_message;

  edit;

  onEdit(){
    this.edit=true;
  }
  onUpdate(data){
    console.log(data.jira_configuration_id,data.url,data.user_name,data.password);
    this.autoService.updateJira( data.jira_configuration_id,data.url,data.user_name,data.password).subscribe(
      event => {

     if (event instanceof HttpResponse) {
      console.log(event);

      let jira_obj=JSON.parse(""+event.body);
      if(jira_obj["statusCode"]==1){
        this.success_message=true;
        this.status_message=jira_obj["message"];
        this.fail_message=false;
        this.edit=false;
      }
      else{
        this.success_message=false;
        this.status_message=jira_obj["message"];
        this.fail_message=true;
      }
      $('#msg').show();
setTimeout(function(){$('#msg').hide();}, 3000);


      }
       
       
      
          
    

    });


    
  }

  onCofigure(data){

    this.autoService.configureWithJira(data.url,data.user_name,data.password).subscribe(
      event => {

     if (event instanceof HttpResponse) {
      console.log(event);
      console.log(data.url,data.user_name,data.password);
      let release_obj=JSON.parse(""+event.body);
      if(release_obj["statusCode"]==1){
        this.success_message=true;
        this.status_message=release_obj["message"];
        this.fail_message=false;
        this.edit=false;
      }
      else{
        this.success_message=false;
        this.status_message=release_obj["message"];
        this.fail_message=true;
      }
      $('#msg').show();
setTimeout(function(){$('#msg').hide();}, 3000);


      }
       
       
      
          
    

    });


    
  }
  jira;
  ngOnInit() {

    this.autoService.getJiraDetailsByUserId(1).subscribe(
      data => {
        
        if(data[0]===undefined){

          this.jira_new=true;
           
        }
        else{
          this.jira=data;
        }
         
        
      },

      error => console.log('oops', error),
      ()=>{
        
      }
       
    );
  }

}

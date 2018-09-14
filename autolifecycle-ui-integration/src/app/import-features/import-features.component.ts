import { Component, OnInit } from '@angular/core';
import { AutoService } from '../auto.service';
import { Router,NavigationEnd  } from '@angular/router';
import { HttpResponse} from '@angular/common/http';
declare var jquery:any; // not required
declare var $ :any; // not required

@Component({
  selector: 'app-import-features',
  templateUrl: './import-features.component.html',
  styleUrls: ['./import-features.component.css']
})
export class ImportFeaturesComponent implements OnInit {

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

  products_list;
  release_list;
  product_id;
  backlogs_list;
  backlogs_response_list;
  backlogs_response:boolean=false; 
  issues_list;
  isIssue:boolean=false; 
  release_id;
  status_message;
  fail_message:boolean=false;
  isMapped:boolean=false;
  issueMapped:boolean=false;
  ischecked:boolean=false;
  getBacklogs(){
    $('body').loading({
      message: 'Working on it...'
    });
    this.backlogs_response_list=[];
    this.isIssue=false;
    this.autoService.getAllBacklogsByProductId(this.product_id).subscribe(
      data => {
        
        
        if(data["statusCode"]==2){
          this.fail_message=true;
          this.status_message=data["message"];
           
        }
       else if(data["statusCode"]==0){
          this.status_message=data["message"];
          this.fail_message=true;
           
          console.log("2 if");
        }
        else{
          this.fail_message=false;
          this.backlogs_list=data;
          console.log("esle");
          console.log(data);
          this.isMapped=true;
          
        }
        
        
        
         
        
      },
  
      error => console.log('oops', error),
      ()=>{
  
        $('body').loading('stop');
  
        $('#msg').show();
        setTimeout(function(){$('#msg').hide();}, 3000);
      }
    );

  }
  getIssues(){
   
    this.issues_list=[];
      this.isIssue=true;
  }
  getEpics(){
    this.isIssue=false;
  }

  releaseSelected(event){
    $('body').loading({
      message: 'Working on it...'
    });
    this.issues_list=[];
    this.issueMapped=false;
    this.fail_message=false;
    this.release_id=event.target.value;
     this.autoService.getAllIssuesByReleaseId(this.release_id).subscribe(
      data => {
        
            
        if(data["statusCode"]==2){
          this.fail_message=true;
          this.status_message=data["message"];
           
        }
       else if(data["statusCode"]==0){
          this.status_message=data["message"];
          this.fail_message=true;
           
          console.log("2 if");
        }
        else{
          this.fail_message=true;
          this.issues_list=data;
          console.log("esle");
          console.log(data);
          this.issueMapped=true;
          
        }

      console.log(data);

         
         
        
      },
  
      error => {
        $('body').loading('stop');
        console.log('oops', error)
      },
      ()=>{
  
        $('body').loading('stop');
  
  
      }
    );
      
   }

   hasClass(id){
           
    console.log($("td#td"+id).parent().html());

    
      

   

   }
   importFeatures(){
   
 
      var listOfItems = "";
      var checkedList=[];

      $.each($("input[name='foo']:checked"), function(){            

        listOfItems=listOfItems+','+$(this).val();
        $(this).closest("tr").addClass("check");

      });
        listOfItems=listOfItems.substr(1, listOfItems.length-1);
        console.log(listOfItems);
        let list_array=listOfItems.split(',');
        console.log(list_array);

        // for(let i=0;i<list_array.length;i++){
        //   console.log(list_array[i]);
        //   $('#'+list_array[i]).attr('style','color: green');
        //   $('#'+list_array[i]).append( "<p>Success</p>" );
        //   setTimeout(function(){$('#'+list_array[i]+" p").empty();}, 3000);
        // }
         this.autoService.importBacklogsFromJira(this.product_id+'',listOfItems).subscribe(
          data => {
            
            this.backlogs_response_list=data;
            console.log(this.backlogs_response_list["body"]);
            
             
            
          },
    
          error => console.log('oops', error),
          ()=>{
            
            let temp=JSON.parse(this.backlogs_response_list["body"]);
            // temp=temp.substr(1,temp.length-2);
            // temp=temp.split("}");
            console.log(temp);
            this.backlogs_response_list=temp;

            console.log(this.backlogs_list);
            this.backlogs_response=true;
          }
           
        );
         
        
   }
  productSelected(event){
    this.product_id=event.target.value;
     this.getReleasesByProduct(this.product_id);
     $('input[name="importfeatures"]').prop('checked', false);
     this.backlogs_list=[];
     this.issues_list=[];
     this.isIssue=false;
     this.fail_message=false;
   }
 
   getReleasesByProduct(pId){
     this.autoService.getReleaseListByPId(pId).subscribe(
       data => {
         
         this.release_list=data;
          
         
       },
 
       error => console.log('oops', error),
       ()=>{
         
       }
        
     );
   }
  ngOnInit() {

      

    $('input[type="radio"]').click(function(){
      if($(this).attr("value")=="backlogs"){
          $(".box").not(".backlogs").hide();
          $(".backlogs").show();
      }
      if($(this).attr("value")=="issues"){
          $(".box").not(".issues").hide();
          $(".issues").show();
      }
      if($(this).attr("value")=="epics"){
          $(".box").not(".epics").hide();
          $(".epics").show();
      }
  });

  this.autoService.getAllProducts().subscribe(
    data => {
      
      this.products_list=data;
      this.product_id=this.products_list[0].product_id;
      
    },

    error => console.log('oops', error),
    ()=>{

      this.getReleasesByProduct(this.product_id);


    }
  );
  }


}

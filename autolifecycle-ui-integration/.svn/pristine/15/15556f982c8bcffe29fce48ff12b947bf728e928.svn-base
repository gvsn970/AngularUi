import { Component, OnInit,AfterViewInit, AfterViewChecked } from '@angular/core';
import{ListOfFeaturesComponent} from '../list-of-features/list-of-features.component';
import { AutoService } from '../auto.service';
import { Router,NavigationEnd  } from '@angular/router';
import { Observable } from 'rxjs';
declare var jquery:any; // not required
declare var $ :any; // not required

@Component({
  selector: 'app-onboard-features',
  templateUrl: './onboard-features.component.html',
  styleUrls: ['./onboard-features.component.css']
})
export class OnboardFeaturesComponent implements OnInit,AfterViewInit {

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

  feature_list;
  feature;
  feature_id;
  no_feature:boolean=false;
  no_release:boolean=false;
  no_backlogs:boolean=false;
  release_id;
  products_list;
  release_list;
  product_id;
  feature_type_list;
  backlogs_list;
  feature_status_list;
  status_id;
  feature_release_id;
  type_id;
  users;
  userId;
  statusSelected(event){
    this.status_id=event.target.value;
  }
  typeSelected(event){
    this.type_id=event.target.value;
  }
  userSelected(event){
    this.userId=event.target.value;
  }
  productSelected(event){
    this.no_release=false;
    this.no_feature=false;
    this.product_id=event.target.value;
    this.getReleasesByProduct(this.product_id);
    
    this.autoService.getAllBacklogs(this.product_id).subscribe(
      data => {
        this.backlogs_list=data;
        
        this.no_backlogs=false;
         
      },
      err => {
        console.log("Error occured.")
      },
      ()=>{

      }
    );
     
     
   }
   releaseSelected(event){
    this.no_release=false;
    this.no_feature=false;
    this.release_id=event.target.value;
    this.getFeatures(this.release_id);
      
   }

   onDrop(event){
          
        event.preventDefault();
        event.stopPropagation();
        console.log(event.target.id);
        console.log("!!!!!!eve"+event.target.parentNode.parentNode.id);
        var current=this;
        this.feature_id=event.target.parentNode.parentNode.id;
        
        $( "#sortable1" ).droppable({
          drop: function( event, ui ) {
            console.log("From Backlog to Feature");
            console.log("++++:"+current.feature_id,current.release_id);
            current.autoService.moveBacklogToFeature(current.feature_id,current.release_id).subscribe(
              data => {
                
                console.log(data);
                
              },
        
              error => console.log('oops', error),
              ()=>{
                
              }
               
            );
          }
        });

        $( "#sortable2" ).droppable({
             drop: function( event, ui ) {
               console.log("From Feature to Backlog");
               console.log("++++:"+current.feature_id,current.release_id);
               current.autoService.moveFeatureToBacklog(current.feature_id,current.release_id).subscribe(
                data => {
                  
                  console.log(data);
                  
                },
          
                error => console.log('oops', error),
                ()=>{
                  
                }
                 
              );
             }
           });

   }

//    onDropBacklog(){
//     console.log("From Feature to Backlog");
//    $( "#sortable2" ).droppable({
//      drop: function( event, ui ) {
//        console.log("From Feature to Backlog");
//      }
//    });
   

// }

   onFeature(feature_id){
    this.feature_id=feature_id;
    this.autoService.getFeatureDetailsbyFId(feature_id).subscribe(
      data => {
        
        this.feature=data;
        this.status_id=this.feature[0].feature_status_id;
        this.type_id=this.feature[0].feature_type_id;
        
      },

      error => console.log('oops', error),
      ()=>{
        
      }
       
    );
   }
   getReleasesByProduct(pId){
     this.autoService.getReleaseListByPId(pId).subscribe(
       data => {
         
         this.release_list=data;
          
         
       },
 
       error => console.log('oops', error),
       ()=>{
        if(this.release_list.length==0){

          this.no_release=true;
      }else{
        console.log(this.release_list[0].releaseId);
        this.getFeatures(this.release_list[0].releaseId);
       }
       }
        
     );
   }


    
   getFeatures(rId){
    this.autoService.getAllFeaturesByReleaseId(rId).subscribe(
      data => {
        this.feature_list=data;
        console.log(data);
        this.no_feature=false;
         
      },
      err => {
        console.log("Error occured.")
      },
      ()=>{
        
          
        $( function() {

          $( "#sortable1, #sortable2" ).sortable({
            connectWith: ".connectedSortable"
            }).disableSelection();
            
        } );


        if(this.feature_list.length==0){

            this.no_feature=true;

        }
      }
    );

   }

  ngOnInit() {
    
    $( function() {

      $( "#sortable1, #sortable2" ).sortable({
        connectWith: ".connectedSortable"
        }).disableSelection();

    } );
   
    
    // $( "#sortable1" ).droppable({
    //   drop: function( event, ui ) {
    //     console.log("From Backlog to Feature");
    //   }
    // });
    // $( "#sortable2" ).droppable({
    //      drop: function( event, ui ) {
    //        console.log("From Feature to Backlog");
    //      }
    //    });
    this.autoService.getAllProducts().subscribe(
      data => {
        
        this.products_list=data;
        this.product_id=this.products_list[0].product_id;
        
      },

      error => console.log('oops', error),
      ()=>{

        this.autoService.getReleaseListByPId(this.product_id).subscribe(
          data => {
            
            this.release_list=data;
            this.no_release=false;
            
          },
    
          error => console.log('oops', error),
          ()=>{
            if(this.release_list.length==0){

              this.no_release=true;
    
          }else{
            this.release_id=this.release_list[0].releaseId; 
            this.getFeatures(this.release_id);
          }
            
          }
           
        );

        this.autoService.getAllBacklogs(this.product_id).subscribe(
          data => {
            this.backlogs_list=data;
            
            this.no_backlogs=false;
             
          },
          err => {
            console.log("Error occured.")
          },
          ()=>{
            $( "#sortable2" ).trigger("drop", $( "#sortable1" )); 

            // $( "#sortable2" ).trigger('drop');
            // $( "#sortable2" ).on( "drop", function( event, ui ) {

            //   console.log("From drop trigger");

            // } );
          }
        );
    


      }
       
    );

    this.autoService.getAllFeaturesStatus().subscribe(
      data => {
        
        this.feature_status_list=data;
         },

      error => console.log('oops', error)

    );
    this.autoService.getAllUsers().subscribe(
      data => {
        
        this.users=data;
        this.userId=this.users[0].userId;
        console.log(this.users);
        console.log(this.userId);
         },

      error => console.log('oops', error)

    );
    this.autoService.getAllFeaturesTypes().subscribe(
      data => {
        
        this.feature_type_list=data;
         },

      error => console.log('oops', error)

    );
  }

  ngAfterViewInit() {
    console.log("view init");
  }

  
}

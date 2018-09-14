import { Component, OnInit,AfterViewInit,DoCheck } from '@angular/core';
import { AutoService } from '../auto.service';
import { Router,NavigationEnd  } from '@angular/router';
import { HttpResponse} from '@angular/common/http';
declare var jquery:any; // not required
declare var $ :any; // not required

@Component({
  selector: 'app-list-of-features',
  templateUrl: './list-of-features.component.html',
  styleUrls: ['./list-of-features.component.css']
})
export class ListOfFeaturesComponent implements OnInit,AfterViewInit,DoCheck {

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
  release_id;
  products_list;
  release_list;
  product_id;
  feature_type_list;
  feature_status_list;
  status_id;
  feature_release_id;
  type_id=''+2;
  users;
  userId;
  success_message:boolean=false;
  popup_fail_message:boolean=false;
  status_message;
  edit:boolean=false;
  statusSelected(event){
    this.status_id=event.target.value;
  }
  typeSelected(event){
    
    this.type_id=event.target.value+'';
    console.log(this.type_id);
  }
  userSelected(event){
    this.userId=event.target.value;
  }
  productSelected(event){
    this.no_release=false;
    this.no_feature=false;
    this.product_id=event.target.value;
     this.getReleasesByProduct(this.product_id);
     
      
     
   }
   releaseSelected(event){
   
    this.no_release=false;
    this.no_feature=false;
    this.release_id=event.target.value;
    this.getFeatures(this.release_id);
      
   }


  


   onDeleteFeature(){
      
      this.autoService.deleteFeature(this.feature_id).subscribe(
        data => {
          console.log(data);
           
        },
        err => {
          console.log("Error occured.")
        },
        ( )=>{
          
          this.getFeatures(this.release_id);
        }
      );

      $('.modal').removeClass('show');
      $('.modal-backdrop').removeClass('modal-backdrop');
      $('body').removeClass('modal-open');
      $('body').prop('style',' ');
   }
   onFeature(feature_id){
    this.feature_id=feature_id;
    this.autoService.getFeatureDetailsbyFId(feature_id).subscribe(
      data => {
        
        this.feature=data;
       
        
      },

      error => console.log('oops', error),
      ()=>{
        this.status_id=this.feature[0].feature_status_id;
        this.type_id=this.feature[0].feature_type_id+'';
         
        console.log(this.feature);
        console.log(this.status_id);
        console.log(this.type_id);
      }
       
    );
   }

   onFeatureEdit(fid){

      this.edit=true;
      console.log(fid);
      this.onFeature(fid);
      let _th=this;
      $('#responsive-modal').on('hidden.bs.modal', function (e) {
        
        _th.edit=false;
        console.log("hiiii");
      })

   }

  
   ngDoCheck() {
   
  }
   


   onFeatureUpdate(data){
        this.autoService.updateFeature(this.feature[0].files,this.feature[0].feature_name,this.feature[0].feature_id,data.feature_description,this.feature[0].story_points,data.type,this.feature[0].fkReleaseId,data.status).subscribe(
          event => {
    
         if (event instanceof HttpResponse) {
    
            console.log(event);
            let release_obj=JSON.parse(""+event.body);
          if(release_obj["statusCode"]==1){
            this.success_message=true;
            this.status_message=release_obj["message"];
            this.popup_fail_message=false;

            this.getFeatures(this.release_id);

            $('#responsive-modal').modal('toggle');

            // $('.modal').removeClass('show');

            // $('.modal-backdrop').removeClass('modal-backdrop fade show');
            
            // $('body').removeClass('modal-open');
            // $('body').prop('style',' ');
          }
          else{
            this.success_message=false;
            this.status_message=release_obj["message"];
            this.popup_fail_message=true;
          }
          $('#msg').show();
          setTimeout(function(){$('#msg').hide();}, 3000);
           
    
          }
           
          () => {
            
           
          }
    
        });

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

        
        
        if(this.feature_list.length==0){

            this.no_feature=true;

        }
      }
    );

   }

  ngOnInit() {


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
        console.log(this.feature_type_list);
         },

      error => console.log('oops', error)

    );
   
  }

  ngAfterViewInit(){



    // $('#myTable, #myTable1, #myTable2').DataTable();
        
    //         var table = $('#example').DataTable({
    //             "columnDefs": [{
    //                 "visible": false,
    //                 "targets": 2
    //             }],
    //             "order": [
    //                 [2, 'asc']
    //             ],
    //             "displayLength": 25,
    //             "drawCallback": function(settings) {
    //                 var api = this.api();
    //                 var rows = api.rows({
    //                     page: 'current'
    //                 }).nodes();
    //                 var last = null;
    //                 api.column(2, {
    //                     page: 'current'
    //                 }).data().each(function(group, i) {
    //                     if (last !== group) {
    //                         $(rows).eq(i).before('<tr class="group"><td colspan="5">' + group + '</td></tr>');
    //                         last = group;
    //                     }
    //                 });
    //             }
    //         });

  }
  
}

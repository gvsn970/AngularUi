import { Component, OnInit ,ViewChild} from '@angular/core';
import { HttpClient , HttpParams,HttpHeaders,HttpResponse} from '@angular/common/http'; 
import { AutoService } from '../auto.service';
import { Router, ActivatedRoute, ParamMap,NavigationEnd } from '@angular/router';
import { switchMap } from 'rxjs/operators';
declare var jquery:any; // not required
declare var $ :any; // not required


@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.css']
})
export class ProductOverviewComponent implements OnInit {
  productList;
  product;
  pLId;
  pId;
  id;
  isDisabled:boolean =true;
  serviceUrl=this.autoService.serviceUrl;
  no_products:boolean=false;
  success_message:boolean=false;
  fail_message:boolean=false;
  status_message;
  
  constructor(private autoService:AutoService, private route: ActivatedRoute,
    private router: Router,private http:HttpClient) { 

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

    
    selectedItem;
    selectedFiles: File[]=[];
   selectFile(event) {

    this.selectedFiles = event.target.files;

  } 
   

  getProductDetails(pid){

    
     this.pId=pid;  
    this.isDisabled=true;
    this.autoService.getProductDetailsByPId(pid).subscribe(
      data => {
        this.product=data;
         
        this.product.disabled=true;
        
      },
      err => {
        console.log(" Error occured.")
      },
      ()=>{
        
       

      }
    );

    
  }


  


  ngOnInit() {

     this.id = this.route.snapshot.paramMap.get('id');

    this.autoService.getProductNameByPLId(this.id).subscribe(
      data => {
        this.productList=data;
         
         
        console.log(this.productList.length);
       
        
        
      },
      err => {
        console.log("Error occured.")
      },
      () =>{

        if(this.productList.length==0){
          this.no_products=true;
        }
        if(this.productList.length>0){
          this.pId=this.productList[0].product_id;
          this.selectedItem=this.pId;
          this.autoService.getProductDetailsByPId(this.pId).subscribe(
            data => {
              this.product=data;
               
              this.product.disabled=true;
              
            },
            err => {
              console.log(" Error occured.")
            },
            ()=>{
              // $('.vtabs ul li:first a').addClass('active');
              
               
             
      
            }
          );

        }
        
    
        

      }
    );

    $(document).on('click', '.browse', function(){
      var file = $(this).parent().parent().parent().find('.file');
      file.trigger('click');
      });
      $(document).on('change', '.file', function(){
      $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
      });
     
    
    
    
      
      


     
         
    
  }

  onAttachmentDelete(attachment_id){
    this.autoService.deleteProductAttachment(this.pId,attachment_id).subscribe(event => {

      if (event instanceof HttpResponse) {
        console.log(event);
        let attactment_obj=JSON.parse(""+event.body);
        if(attactment_obj["status"]==1){
          this.success_message=true;
          this.status_message=attactment_obj["message"];
          this.fail_message=false;
          $('#'+attachment_id).hide(); 
          console.log($('#'+attachment_id).val);
          
        }
        else{
          this.success_message=false;
          this.status_message=attactment_obj["message"];
          this.fail_message=true;
        }
        
        $('#msg').show();
setTimeout(function(){$('#msg').hide();}, 3000);
 
       }
       
     },
     ()=>{
      this.getProductDetails(this.pId);
     });

  }

  temp;
  status;
  message;
  delete_message:boolean=false;
  onDelete(){
    this.status=0;
    this.fail_message=false;

    console.log("12345"+this.productList.length);
    if(this.productList.length === 1){
      this.autoService.deleteProduct(this.pId).subscribe(
        data => {
          console.log(data);
           
        },
        err => {
          console.log("Error occured.")
        },
        ()=>{
          this.ngOnInit();
        }
      );
      
      // this.router.navigate['Product_Overview/'+this.id];
    }
    else{
       
    this.autoService.deleteProduct(this.pId).subscribe(
      data => {
        console.log(data["body"]);
        this.temp=data["body"];
         
        
      },
      err => {
        console.log("Error occured.")
      },
      ( )=>{
         
        let arr=this.temp.split(",");
         console.log(arr[1].split(":")[1]);
         this.status=arr[0].split(":")[1];
         this.message=arr[1].split(":")[1];
          if(this.status==3){
              this.delete_message=true;
              $('#msg').show();
setTimeout(function(){$('#msg').hide();}, 5000);
          }
        if(this.productList.length==0){
          this.no_products=true;
        }
         else{


          this.autoService.getProductNameByPLId(this.id).subscribe(
            data => {
              this.productList=data;
      
               
              console.log(this.productList.length);
              
              
      
            },
            err => {
              console.log("Error occured.")
            },
            () =>{
              if(this.productList.length>0){
                this.pId=this.productList[0].product_id;
                this.getProductDetails(this.pId);
              }
             
      
            }
          );
         }
        
      }

    );
  }


  $('.modal').removeClass('show');
  $('.modal-backdrop').removeClass('modal-backdrop');
  $('body').removeClass('modal-open');
  $('body').prop('style',' ');



  }
  onSubmit(){
    console.log("disabled:"+this.isDisabled);
     this.isDisabled=false;

     $.validate({
      validateOnBlur : true
       
      
    });
  }
  
  onCancel(){
    console.log("disabled:"+this.isDisabled);
     this.isDisabled=true;
  }

  onSave(data){
    console.log(this.selectedFiles,this.id,this.pId,data.Pname,data.Pdesc);
    this.autoService.updateProduct(this.selectedFiles,this.id,this.pId,data.Pname,data.Pdesc).subscribe(event => {


     
      if (event instanceof HttpResponse) {
 
         console.log(event);
 
       }
 
     },
     err => {
       console.log("Error occured.")
     },
     () =>{


      this.autoService.getProductNameByPLId(this.id).subscribe(
        data => {
          this.productList=data;
           
          
          
        },
        err => {
          console.log("Error occured.")
        },
        () =>{
  
          this.autoService.getProductDetailsByPId(this.pId).subscribe(
            data => {
              this.product=data;
               
              this.product.disabled=true;
              this.success_message=false;
              
            },
            err => {
              console.log(" Error occured.")
            },
            ()=>{
              
              
              this.selectedItem =this.pId;
             
      
            }
          );
      
          
  
        }
      );
      //  this.getProductDetails(this.pId);

     }
    
    );
     this.isDisabled=true;
      


     
  }


  
  ngAfterViewInit(){

    
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpParams,HttpHeaders,HttpResponse} from '@angular/common/http'; 
import {  Routes,Router,NavigationEnd  } from '@angular/router';
import { AutoService } from '../auto.service';
declare var jquery:any; // not required
declare var $ :any; // not required
 
@Component({
  selector: 'app-create-product-line',
  templateUrl: './create-product-line.component.html',
  styleUrls: ['./create-product-line.component.css']
})
export class CreateProductLineComponent implements OnInit {
  submited;
  success_message:boolean=false;
  fail_message:boolean=false;
  status_message;
  constructor(private http: HttpClient,private autoService:AutoService,private router: Router) { 


   
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
  serviceUrl=this.autoService.serviceUrl;
   
   selectedFiles: File[]=[];
   selectFile(event) {

    this.selectedFiles = event.target.files;

  }

  upload(data) {
 

    this.autoService.addProductLine(this.selectedFiles,data.PLname,data.PLdesc).subscribe(event => {

     if (event instanceof HttpResponse) {
      console.log(event);
        console.log(event.body["statusCode"]);
        console.log(event.body["status"]);

        if(event.body["status"]==1){
          this.success_message=true;
          this.status_message=event.body["message"];
          this.fail_message=false;
        }
        else{
          this.success_message=false;
          this.status_message=event.body["message"];
          this.fail_message=true;
        }
      }

    });

    this.submited=true;
     

    $('#msg').show();
setTimeout(function(){$('#msg').hide();}, 5000);

  }


 

  ngOnInit(){
    
    
    $.validate({
      
      validateOnBlur : true
      
  
      
    });

   
     
    this.submited=false;

    $(document).on('click', '.browse', function(){
      var file = $(this).parent().parent().parent().find('.file');
      file.trigger('click');
      });
      $(document).on('change', '.file', function(){
      $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
      });
     
    
    
    
    
      }


  

}

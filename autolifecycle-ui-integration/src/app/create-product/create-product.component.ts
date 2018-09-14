import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpParams,HttpHeaders,HttpResponse} from '@angular/common/http'; 
import {  Routes,Router,NavigationEnd  } from '@angular/router';
import { AutoService } from '../auto.service';
declare var jquery:any; // not required
declare var $ :any; // not required
 

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

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
  productLineList;
  submited;
  success_message:boolean=false;
  fail_message:boolean=false;
  status_message;
  boardsList;

  selectedFiles: File[]=[];
   selectFile(event) {

    this.selectedFiles = event.target.files;

  }

  upload(data) {
    this.success_message=false;
  this.fail_message=false;
    $('body').loading({
      message: 'Creating ... Product'
    });
   
 
    var jira_map = $('#jira_check_box').is(':checked');
    console.log(jira_map);
    console.log(this.selectedFiles,data.PLid,data.Pname,data.Pdesc,jira_map,data.jira_board_id);
    this.autoService.addProduct(this.selectedFiles,data.PLid,data.Pname,data.Pdesc,jira_map,data.jira_board_id).subscribe(event => {
     
     if (event instanceof HttpResponse) {

        console.log(event);
        
        console.log(event.body["status"]);
        if(event.body["status"]==1){
          this.success_message=true;
          this.status_message=event.body["message"];
          this.fail_message=false;
          $('body').loading('stop');
          $('#msg').show();
      setTimeout(function(){$('#msg').hide();}, 3000);
        }
        else{
          this.success_message=false;
          this.status_message=event.body["message"];
          this.fail_message=true;
          $('body').loading('stop');
          $('#msg').show();
      setTimeout(function(){$('#msg').hide();}, 3000);
        }

      }
    },
    err=>{
      $('body').loading('stop');
    } 
    
    );
    
    this.submited=true;
    // $("form").trigger("reset");
    console.log("done");
    
   

    

  }

   


  ngOnInit() {

    $('input[type="checkbox"]').click(function(){
      var inputValue = $(this).attr("value");
      $("." + inputValue).toggle();
     });

     this.autoService.getAllBoardsFromJira(1).subscribe(
      data => {
        this.boardsList=data;
        console.log(this.boardsList);
     
      },
      err => {
        console.log("Error occured.")
      }
    );
    
    this.submited=false;
    this.autoService.getAllProductLines().subscribe(
      data => {
        this.productLineList=data;
     
      },
      err => {
        console.log("Error occured.")
      }
    );
   
$(document).on('click', '.browse', function(){
  var file = $(this).parent().parent().parent().find('.file');
  file.trigger('click');
  });
  $(document).on('change', '.file', function(){
  $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
  });
 



  $.validate({
    validateOnBlur : true
     

    
  });
  }

}

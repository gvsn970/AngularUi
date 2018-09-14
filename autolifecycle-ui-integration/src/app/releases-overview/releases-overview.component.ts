import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpParams,HttpHeaders,HttpResponse} from '@angular/common/http'; 
import { AutoService } from '../auto.service';
import { Router, ActivatedRoute, ParamMap,NavigationEnd } from '@angular/router';
import { FormGroup} from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { ListOfReleasesComponent } from '../list-of-releases/list-of-releases.component';
declare var jquery:any;
declare var $ :any; 

@Component({
  selector: 'app-releases-overview',
  templateUrl: './releases-overview.component.html',
  styleUrls: ['./releases-overview.component.css']
})
export class ReleasesOverviewComponent implements OnInit {
 
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
    release;
    release_phases;
    id;
    edit;
    Edit:boolean;
    success_message:boolean=false;
    popup_success_message:boolean=false;
    fail_message:boolean=false;
    popup_fail_message:boolean=false;
    status_message;
    serviceUrl=this.autoService.serviceUrl;
    selectedFiles: File[]=[];
   selectFile(event) {

    this.selectedFiles = event.target.files;

  }

  ReleasePhaseFilesList: File[]=[];
  ReleasePhaseFiles(event) {

   this.ReleasePhaseFilesList = event.target.files;

 }

 MilestoneFilesList: File[]=[];
 MilestoneFiles(event) {

   this.MilestoneFilesList = event.target.files;

 }

    getProductDetails(pid){

    
       
    }



  onAttachmentDelete(attachment_id){
     
    this.autoService.deleteReleaseAttachment(this.release[0].releaseId,attachment_id).subscribe(event => {

      if (event instanceof HttpResponse) {
        console.log(event);
        let attactment_obj=JSON.parse(""+event.body);
        if(attactment_obj["statusCode"]==1){
          this.success_message=true;
          this.status_message=attactment_obj["message"];
          this.fail_message=false;
          $('#'+attachment_id).hide(); 
          console.log($('#'+attachment_id).val);
          this.ngOnInit();
          
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
       

    

     });

  }

  onReleasePhaseAttachmentDelete(attachment_id){
     

    
    this.autoService.deleteReleaseAttachment(this.release[0].releaseId,attachment_id).subscribe(event => {

      if (event instanceof HttpResponse) {
        console.log(event);
        let attactment_obj=JSON.parse(""+event.body);
        if(attactment_obj["statusCode"]==1){
          this.success_message=true;
          this.status_message=attactment_obj["message"];
          this.fail_message=false;
          $('#'+attachment_id).hide(); 
          console.log($('#'+attachment_id).val);
          this.ngOnInit();
          
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
       

    

     });

  }


    onSave(data){

      console.log(this.selectedFiles,this.release[0].fkProductId,this.release[0].releaseId,this.release[0].releaseName,data.Rdesc,data.Idate,this.release[0].releaseDateExternal);
      this.autoService.updateRelease(this.selectedFiles,data.P_id,data.R_id,this.release[0].releaseName,data.Rdesc,data.Idate,this.release[0].releaseDateExternal).subscribe(
        event => {
  
       if (event instanceof HttpResponse) {
  
          console.log(event);
          let release_obj=JSON.parse(""+event.body);
        if(release_obj["statusCode"]==1){
          this.success_message=true;
          this.status_message=release_obj["message"];
          this.fail_message=false;
          this.ngOnInit();
        }
        else{
          this.success_message=false;
          this.status_message=release_obj["message"];
          this.fail_message=true;
        }
        $('#msg').show();
        setTimeout(function(){$('#msg').hide();}, 3000);
         
  
        }
         
        () => {
          
         
        }
  
      });
    }

    onCreateMilestone(data){

      this.autoService.addMilestone(this.MilestoneFilesList,this.release[0].releaseId,data.release_phase_name,data.description,data.end_date).subscribe(
        event => {
  
       if (event instanceof HttpResponse) {
  
        console.log(event);
          let release_obj=JSON.parse(""+event.body);
          console.log(release_obj["statusCode"]);
        if(release_obj["statusCode"]==1){
          this.success_message=true;
          this.status_message=release_obj["message"];
          this.popup_fail_message=false;
          $('.modal').removeClass('show');
        $('.modal-backdrop').removeClass('modal-backdrop');
        $('body').removeClass('modal-open');
        $('body').prop('style',' ');
          this.ngOnInit();

         
        }
        else{
          this.success_message=false;
          this.status_message=release_obj["message"];
          this.popup_fail_message=true;
        }
        $('#msg').show();
        setTimeout(function(){$('#msg').hide();}, 3000);
         
  
        }
         
       
  
      }, () => {
          
        
      });

    }


    onCreateReleasePhase(data){

        this.autoService.addReleasePhase(this.ReleasePhaseFilesList,this.release[0].releaseId,data.release_phase_name,data.description,data.start_date,data.end_date).subscribe(
          event => {
            this.fail_message=false;
         if (event instanceof HttpResponse) {
    
          console.log(event);
            let release_obj=JSON.parse(""+event.body);
            console.log(release_obj["statusCode"]);
          if(release_obj["statusCode"]==1){
            this.success_message=true;
            this.status_message=release_obj["message"];
            this.popup_fail_message=false;
            $('.modal').removeClass('show');
          $('.modal-backdrop').removeClass('modal-backdrop');
          $('body').removeClass('modal-open');
          $('body').prop('style',' ');
            this.ngOnInit();

           
          }
          else{
            this.success_message=false;
            this.status_message=release_obj["message"];
            this.popup_fail_message=true;
          }
          $('#msg').show();
          setTimeout(function(){$('#msg').hide();}, 3000);
           
    
          }
           
         
    
        }, () => {
            
          
        });
    }
    
    myform;


    onUpdateReleasePhase(i){
      
        


      let phase_type = $('#phase_type'+i).val() ;
      let release_phase_id = $('#release_phase_id'+i).val() ;
      let release_phase_name = $('#release_phase_name'+i).val() ;
      console.log($('#release_phase_name'+i).val());
      let description = $('#description'+i).val() ;
      let start_date = $('#start_date'+i).val() ;
      let end_date= $('#end_date'+i).val() ;
      
      
       
      console.log(this.ReleasePhaseFilesList,release_phase_id,this.release[0].releaseId,release_phase_name,description,start_date,end_date);
       
       if(phase_type==='Milestone'){
        
        this.autoService.updateMilestone(this.MilestoneFilesList,release_phase_id,this.release[0].releaseId,release_phase_name,description,end_date).subscribe(
          event => {
    
         if (event instanceof HttpResponse) {
    
          console.log(event);
            let release_obj=JSON.parse(""+event.body);
            console.log(release_obj["statusCode"]);
          if(release_obj["statusCode"]==1){
            this.success_message=true;
            this.status_message=release_obj["message"];
            this.fail_message=false;
            $('.modal').removeClass('show');
          $('.modal-backdrop').removeClass('modal-backdrop');
          $('body').removeClass('modal-open');
          $('body').prop('style',' ');
            this.ngOnInit();
  
           
          }
          else{
            this.success_message=false;
            this.status_message=release_obj["message"];
            this.fail_message=true;
          }
          $('#msg').show();
          setTimeout(function(){$('#msg').hide();}, 3000);
           
    
          }
           
         
    
        }, () => {
            
          
        });

       }
       if(phase_type==='Phase'){
      this.autoService.updateReleasePhase(this.ReleasePhaseFilesList,release_phase_id,this.release[0].releaseId,release_phase_name,description,start_date,end_date).subscribe(
        event => {
  
       if (event instanceof HttpResponse) {
  
        console.log(event);
          let release_obj=JSON.parse(""+event.body);
          console.log(release_obj["statusCode"]);
        if(release_obj["statusCode"]==1){
          this.success_message=true;
          this.status_message=release_obj["message"];
          this.fail_message=false;
          $('.modal').removeClass('show');
        $('.modal-backdrop').removeClass('modal-backdrop');
        $('body').removeClass('modal-open');
        $('body').prop('style',' ');
          this.ngOnInit();

         
        }
        else{
          this.success_message=false;
          this.status_message=release_obj["message"];
          this.fail_message=true;
        }
        $('#msg').show();
        setTimeout(function(){$('#msg').hide();}, 3000);
         
  
        }
         
       
  
      }, () => {
          
        
      });
}

     
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }
  ngOnInit() {
    
    this.selectedFiles=[];
    $(document).on('click', '.browse', function(){
      var file = $(this).parent().parent().parent().find('.file');
      file.trigger('click');
      });
      $(document).on('change', '.file', function(){
      $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
      });
    
    
    let id = this.route.snapshot.paramMap.get('rid');
    this.edit =id.split(":");
    
    console.log(this.edit);
     
    if(this.edit[1] === 'true'){
        this.Edit=true;
       
    }
    
    this.autoService.getReleaseDetailsByRId(id).subscribe(
      data => {
        this.release=data;
        console.log("hiii"+this.release[0].releaseName);
      },
      err => {
        console.log(" Error occured.")
      },
      ()=>{
        this.autoService.getReleasePhasesByRId(id).subscribe(
          data => {
            this.release_phases=data;
             
          }
        );
      }
    );

  }

}

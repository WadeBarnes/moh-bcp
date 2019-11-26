import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CreateFacilityForm } from '../../models/create-facility-form';
import { CheckCompleteBaseService } from 'moh-common-lib';
import { CREATE_FACILITY_PAGES } from '../../create-facility-route-constants';
import { CreateFacilityDataService } from '../../services/create-facility-data.service';
import { BCPApiService } from 'src/app/services/bcp-api.service';
import { CreateResponse } from '../../models/create-facility-api-model';
import { SplunkLoggerService } from '../../../../services/splunk-logger.service';
import { ValidationResponse, ReturnCodes } from '../../models/create-facility-api-model';
import { SignatureComponent } from '../../../core-bcp/components/signature/signature.component';
import { NgControl } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent extends CreateFacilityForm implements OnInit {
  loading = false;
  displayError: boolean = false;
  confirmed: boolean = false;
  showDuplicateWarning = true;

  links = environment.links;

  @ViewChild(SignatureComponent, {static: true}) signature: SignatureComponent;
  @ViewChild('screenshotArea', {static: true}) screenshotArea: ElementRef;


  constructor(protected router: Router,
              private pageCheckService: CheckCompleteBaseService,
              public dataService: CreateFacilityDataService,
              private api: BCPApiService,
              private splunkLoggerService: SplunkLoggerService) {
    super(router);
   }

  ngOnInit() {
    this.pageCheckService.setPageIncomplete();
    this.showDuplicateWarning = this.dataService.apiDuplicateWarning;

    // Set isPrintView to false
    this.dataService.isPrintView = false;
  }

  get pageTitle() {
    return CREATE_FACILITY_PAGES.REVIEW.title;
  }


  toggleValidation(data) {
    console.log(data as boolean);

    this.confirmed = data as boolean;
    this.displayError = !this.confirmed;

    if ( this.confirmed && this.confirmed === true  ) {
      this.dataService.dateOfAcceptance = (new Date());
    }
  }

  canContinue() {
    // TODO : Write! By Defualt this just returns this.form.valid, But if we do
    // not want to setup a form, we must modify this to just ensure the
    // "Authorization of Submission" checkbox is written.
    this.displayError = !this.confirmed;
    return this.confirmed;
  }

  continue() {
    this.signature._onTouched();

    if (this.canContinue()) {
      this.submit();
      // this.pageCheckService.setPageComplete();
      // this.navigate(CREATE_FACILITY_PAGES.SUBMISSION.fullpath);
      // TODO: - API Request / Submission
    }
  }

  submit() {
    this.loading = true;
    this.dataService.dateOfSubmission = new Date();
    const jsonPayLoad = this.dataService.getJSONPayload();
    this.api.createFacility(jsonPayLoad)
      .subscribe((res: ValidationResponse) => {

        this.dataService.jsonCreateFacility.response = res;
        this.splunkLoggerService.log(
          this.dataService.getSubmissionLogObject<CreateResponse>(
            'Create Facility',
            this.dataService.jsonCreateFacility.response
          )
        );

        this.loading = false;
        // TODO: Handle failure case, e.g. no backend, failed request, etc.
        this.pageCheckService.setPageComplete();
        this.navigate(CREATE_FACILITY_PAGES.SUBMISSION.fullpath);
      }, error => {
        console.log('ARC apiService onerror', error);
        this.handleError();
      });
  }

  private handleError(): void {
    this.loading = false;
  }

  log(x) {
    console.log('reviewLog', x);
  }

  screenshot() {

    const scrollTop = this.screenshotArea.nativeElement.offsetTop;
    // const target = this.hiddenClone(this.screenshotArea.nativeElement);


    const opts = {
      // scrollX: 1425,
      logging: true,

      // height: window.outerHeight + window.innerHeight,
      // windowHeight: window.outerHeight + window.innerHeight,
      // width: 1000,
      // height: 1000,
      onclone: (cloneDoc) => {
        const wrapper = cloneDoc.getElementById('screenshot-wrapper');
        // .style.display = 'block'; 
        console.log('ON CLONE');

      },
      onrendered: (canvas) => {
        console.log('ON RENDERED')
        // document.getElementById('screenshot-wrapper').parentNode.style.overflow = 'hidden';
        // var dataUrl = canvas.toDataURL();
        // window.open(dataUrl, "toDataURL() image", "width=800, height=800");
        //Canvas2Image.saveAsPNG(canvas);

        // document.body.removeChild(target);
        // document.body.addChild(canvas);
      }
    };

    // const target = document.getElementById('screenshot-area');
    // const target = document.body;
    const target = this.screenshotArea.nativeElement;



    // window.scrollTo(0, 0);
    html2canvas(target, opts).then(canvas => {
      console.log('Canvas!', canvas);
      document.body.appendChild(canvas);
    });

    // var target_container = document.getElementById("id_of_div_I_want_to_render_on_canvas");
    // const target_container = document.body;
    // html2canvas(target_container, {
    //   onrendered: function (canvas) {
    //     var canvas_image = canvas.toDataURL("image/png"), // change output image type here
    //       img = new Image(); // create a new blank image

    //     // img.src = canvas_image; // set the canvas_image as the new image's source
    //     // img.width = el.offsetWidth; // make the image the same width and height as the target container
    //     // img.height = el.offsetHeight;
    //     // img.onload = function () {
    //     // //   // do stuff
    //     // });
    //     console.log('canvas!!!', canvas);
    //     document.body.appendChild(canvas);

    //   }
    // });
  }

  // https://stackoverflow.com/questions/13591339/html2canvas-offscreen
  private hiddenClone(element){
    // Create clone of element
    var clone = element.cloneNode(true);
  
    // Position element relatively within the 
    // body but still out of the viewport
    var style = clone.style;
    style.position = 'relative';
    style.top = window.innerHeight + 'px';
    style.left = 0;
  
    // Append clone to body and return the clone
    document.body.appendChild(clone);
    return clone;
  }

}

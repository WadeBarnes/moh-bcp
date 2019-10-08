import { Component, OnInit } from '@angular/core';
import { Container, CheckCompleteBaseService } from 'moh-common-lib';
import { createFacilityPageRoutes } from '../create-facility-page-routing';
import { environment } from 'src/environments/environment';
import { CREATE_FACILITY } from '../create-facility-route-constants';

@Component({
  selector: 'app-create-facility-container',
  templateUrl: './create-facility-container.component.html',
  styleUrls: ['./create-facility-container.component.scss']
})
export class CreateFacilityContainerComponent extends Container implements OnInit {

  constructor(private checkPageService: CheckCompleteBaseService) {
    super();
    this.setProgressSteps( createFacilityPageRoutes );

    // TODO: Refactor into new  service inheritis from CheckCompleteBaseService.
    // Re-consider when building out other forms and we can assess impact.
    this.checkPageService.pageCheckList = createFacilityPageRoutes.map(x => {
      return {
        route: x.path,
        isComplete: false,
      };
    });
    this.checkPageService.bypassGuards = environment.bypassGuards;
    this.checkPageService.startUrl = `/${CREATE_FACILITY}/home`;
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterPractitionerDataService } from '../../services/register-practitioner-data.service';
import { ContainerService, PageStateService } from 'moh-common-lib';
import { BcpBaseForm } from '../../../core-bcp/models/bcp-base-form';

interface RadioItem {
  label: string;
  value: string;
  showEffectiveDate: boolean;
  showExpirationDate: boolean;
  effectiveDateLabel: string;
  expirationDateLabel: string;
}

@Component({
  selector: 'bcp-practitioner-assignment',
  templateUrl: './practitioner-assignment.component.html',
  styleUrls: ['./practitioner-assignment.component.scss']
})
export class PractitionerAssignmentComponent extends BcpBaseForm implements OnInit {

  pageTitle: string = 'Practitioner Assignment';
  formGroup: FormGroup;
  radioItems: Array<RadioItem>;
  sameMailAddrError: boolean = false;

  constructor( protected containerService: ContainerService,
               protected router: Router,
               protected pageStateService: PageStateService,
               private fb: FormBuilder,
               public dataService: RegisterPractitionerDataService ) {
    super(router, containerService, pageStateService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.formGroup = this.fb.group({
      attachmentType: [this.dataService.pracAttachmentType, [Validators.required]],
      effectiveDate: [this.dataService.pracAttachmentEffectiveDate, [Validators.required]],
      expirationDate: [this.dataService.pracAttachmentExpirationDate, [Validators.required]]
    });

    this.radioItems = [
      {
        label: 'New assignment',
        value: 'new',
        showEffectiveDate: true,
        showExpirationDate: false,
        effectiveDateLabel: 'What is the effective date for the new assignment?',
        expirationDateLabel: null,
      },
      {
        label: 'Cancel the assignment',
        value: 'cancel',
        showEffectiveDate: true,
        showExpirationDate: false,
        effectiveDateLabel: 'What date should the assignment be removed?',
        expirationDateLabel: null,
      },
      {
        label: 'Change the assignment date',
        value: 'change-date',
        showEffectiveDate: true,
        showExpirationDate: false,
        effectiveDateLabel: 'What is the new effective date for the assignment?',
        expirationDateLabel: null,
      },
      {
        label: 'Change the cancellation date',
        value: 'change-cancel-date',
        showEffectiveDate: true,
        showExpirationDate: false,
        effectiveDateLabel: 'When should the practitioner assignment to the facility be removed?',
        expirationDateLabel: null,
      },
      {
        label: 'Locum assignment',
        value: 'locum',
        showEffectiveDate: true,
        showExpirationDate: true,
        effectiveDateLabel: 'What is the effective date for the locum?',
        expirationDateLabel: 'What is the cancellation date for the locum?',
      },
    ];
  }

  continue() {
    this.markAllInputsTouched();

    console.log( 'Continue: Practitioner Assignment');
    if (this.formGroup.valid) {
      this.navigate(PRACTITIONER_REGISTRATION_PAGES.REVIEW.fullpath);
    }
  }

  changeAttachmentType(value) {
    this.dataService.pracAttachmentType = value;

    const groupItems = {
      attachmentType: [this.dataService.pracAttachmentType, [Validators.required]],
      effectiveDate: [this.dataService.pracAttachmentEffectiveDate, [Validators.required]],
      expirationDate: [this.dataService.pracAttachmentExpirationDate, value === 'locum' ? [Validators.required] : null]
    };
    this.formGroup = this.fb.group(groupItems);
  }
}

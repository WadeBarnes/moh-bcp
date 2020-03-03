import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedCoreModule } from 'moh-common-lib';
import { CoreBCPModule } from '../../../core-bcp/core-bcp.module';

import { SubmissionComponent } from './submission.component';
import { ReviewCancelChangeComponent } from '../../components/review-cancel-change/review-cancel-change.component';

describe('SubmissionComponent', () => {
  let component: SubmissionComponent;
  let fixture: ComponentFixture<SubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreBCPModule,
        RouterTestingModule,
        SharedCoreModule
      ],
      declarations: [
        ReviewCancelChangeComponent,
        SubmissionComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

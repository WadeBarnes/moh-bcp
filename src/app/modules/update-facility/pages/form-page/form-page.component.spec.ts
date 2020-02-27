import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPageComponent } from './form-page.component';
import { CoreBCPModule } from '../../../core-bcp/core-bcp.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormPageComponent', () => {
  let component: FormPageComponent;
  let fixture: ComponentFixture<FormPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CoreBCPModule, ReactiveFormsModule, RouterTestingModule ],
      declarations: [ FormPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
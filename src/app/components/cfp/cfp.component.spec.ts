/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CfpComponent } from './cfp.component';

describe('CfpComponent', () => {
  let component: CfpComponent;
  let fixture: ComponentFixture<CfpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

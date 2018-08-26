/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Season2Component } from './season2.component';

describe('Season2Component', () => {
  let component: Season2Component;
  let fixture: ComponentFixture<Season2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Season2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Season2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

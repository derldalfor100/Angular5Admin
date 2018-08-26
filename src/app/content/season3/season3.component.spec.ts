/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Season3Component } from './season3.component';

describe('Season3Component', () => {
  let component: Season3Component;
  let fixture: ComponentFixture<Season3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Season3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Season3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

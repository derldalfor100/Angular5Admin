/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Season1Component } from './season1.component';

describe('Season1Component', () => {
  let component: Season1Component;
  let fixture: ComponentFixture<Season1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Season1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Season1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

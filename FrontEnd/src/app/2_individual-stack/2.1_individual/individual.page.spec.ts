import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualPage } from './individual.page';

describe('IndividualPage', () => {
  let component: IndividualPage;
  let fixture: ComponentFixture<IndividualPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

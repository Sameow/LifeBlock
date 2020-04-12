import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionPage } from './institution.page';

describe('InstitutionsPage', () => {
  let component: InstitutionPage;
  let fixture: ComponentFixture<InstitutionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstitutionPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

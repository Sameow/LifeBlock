import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApproveInstitutionButtonComponent } from './approve-institution-button.component';

describe('ApproveInstitutionButtonComponent', () => {
  let component: ApproveInstitutionButtonComponent;
  let fixture: ComponentFixture<ApproveInstitutionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveInstitutionButtonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApproveInstitutionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

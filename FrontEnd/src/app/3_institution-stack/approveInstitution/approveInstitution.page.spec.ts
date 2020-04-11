import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../0_explore-container/explore-container.module';
import { ApproveInstitutionPage } from './approveInstitution.page';

describe('ApproveInstitutionPage', () => {
  let component: ApproveInstitutionPage;
  let fixture: ComponentFixture<ApproveInstitutionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveInstitutionPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ApproveInstitutionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../0_explore-container/explore-container.module';
import { RegisterInstitutionPage } from './register-institution.page';

describe('RegisterInstitutionPage', () => {
  let component: RegisterInstitutionPage;
  let fixture: ComponentFixture<RegisterInstitutionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterInstitutionPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterInstitutionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

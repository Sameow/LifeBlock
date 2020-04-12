import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../0_explore-container/explore-container.module';
import { SearchInstitutionPage } from './search-institution.page';

describe('SearchInstitutionPage', () => {
  let component: SearchInstitutionPage;
  let fixture: ComponentFixture<SearchInstitutionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchInstitutionPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchInstitutionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

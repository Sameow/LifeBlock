import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../0_explore-container/explore-container.module';
import { SearchUserPage } from './search-user.page';

describe('SearchUserPage', () => {
  let component: SearchUserPage;
  let fixture: ComponentFixture<SearchUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchUserPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

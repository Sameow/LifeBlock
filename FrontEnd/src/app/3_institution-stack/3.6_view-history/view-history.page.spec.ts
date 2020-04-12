import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../0_explore-container/explore-container.module';
import { ViewHistoryPage } from './view-history.page';

describe('ViewHistoryPage', () => {
  let component: ViewHistoryPage;
  let fixture: ComponentFixture<ViewHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewHistoryPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

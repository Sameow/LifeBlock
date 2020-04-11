import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../0_explore-container/explore-container.module';

import { ViewGivenFeedbackPage } from './viewGivenFeedback.page';

describe('ViewGivenFeedbackPage', () => {
  let component: ViewGivenFeedbackPage;
  let fixture: ComponentFixture<ViewGivenFeedbackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewGivenFeedbackPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewGivenFeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

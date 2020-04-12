import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../0_explore-container/explore-container.module';

import { SubmitFeedbackPage } from './submit-feedback.page';

describe('SubmitFeedbackPage', () => {
  let component: SubmitFeedbackPage;
  let fixture: ComponentFixture<SubmitFeedbackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitFeedbackPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitFeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

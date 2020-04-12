import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../0_explore-container/explore-container.module';
import { UploadInteractionPage } from './upload-interaction.page';

describe('UploadInteractionPage', () => {
  let component: UploadInteractionPage;
  let fixture: ComponentFixture<UploadInteractionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadInteractionPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadInteractionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SystemAccountPage } from './system-account.page';

describe('SystemAccountPage', () => {
  let component: SystemAccountPage;
  let fixture: ComponentFixture<SystemAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SystemAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

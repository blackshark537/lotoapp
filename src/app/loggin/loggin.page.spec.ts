import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogginPage } from './loggin.page';

describe('LogginPage', () => {
  let component: LogginPage;
  let fixture: ComponentFixture<LogginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

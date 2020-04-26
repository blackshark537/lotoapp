import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SorteoPage } from './sorteo.page';

describe('SorteoPage', () => {
  let component: SorteoPage;
  let fixture: ComponentFixture<SorteoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SorteoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SorteoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

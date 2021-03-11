import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddnewchatPage } from './addnewchat.page';

describe('AddnewchatPage', () => {
  let component: AddnewchatPage;
  let fixture: ComponentFixture<AddnewchatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewchatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddnewchatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

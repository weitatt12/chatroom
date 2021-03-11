import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParticularchatroomPage } from './particularchatroom.page';

describe('ParticularchatroomPage', () => {
  let component: ParticularchatroomPage;
  let fixture: ComponentFixture<ParticularchatroomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticularchatroomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParticularchatroomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

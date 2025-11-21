import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WtpComponent } from './wtp.component';

describe('WtpComponent', () => {
  let component: WtpComponent;
  let fixture: ComponentFixture<WtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WtpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

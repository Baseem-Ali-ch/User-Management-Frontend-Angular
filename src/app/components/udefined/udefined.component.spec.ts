import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdefinedComponent } from './udefined.component';

describe('UdefinedComponent', () => {
  let component: UdefinedComponent;
  let fixture: ComponentFixture<UdefinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UdefinedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UdefinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChwComponent } from './chw.component';

describe('ChwComponent', () => {
  let component: ChwComponent;
  let fixture: ComponentFixture<ChwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedChwComponent } from './selected-chw.component';

describe('SelectedChwComponent', () => {
  let component: SelectedChwComponent;
  let fixture: ComponentFixture<SelectedChwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedChwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedChwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

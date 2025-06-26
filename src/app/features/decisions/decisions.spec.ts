import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Decisions } from './decisions';

describe('Decisions', () => {
  let component: Decisions;
  let fixture: ComponentFixture<Decisions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Decisions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Decisions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

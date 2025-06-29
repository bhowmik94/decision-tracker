import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionNew } from './decision-new';

describe('DecisionNew', () => {
  let component: DecisionNew;
  let fixture: ComponentFixture<DecisionNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecisionNew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecisionNew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

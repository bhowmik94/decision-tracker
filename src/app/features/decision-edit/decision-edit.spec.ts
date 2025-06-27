import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionEdit } from './decision-edit';

describe('DecisionEdit', () => {
  let component: DecisionEdit;
  let fixture: ComponentFixture<DecisionEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecisionEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecisionEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { DecisionRepository } from '../../repositories/decision.repository';
import { Decision, priorityOptions } from '../../models/decision.model';

import { normalizeDecisionDate } from '../../shared/page-header/utils/decision.utils';
import { addChipItem, removeChipItem } from '../../shared/page-header/utils/decision.utils';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';
import { PageHeader } from '../../shared/page-header/page-header';

@Component({
  selector: 'app-decision-new',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatOptionModule,
    MatIconModule,
    MatButtonModule,
    PageHeader,
  ],
  templateUrl: './decision-new.html',
  styleUrl: './decision-new.scss',
})
export class DecisionNew {
  decision!: Decision | null;

  form: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  priorityOptions = priorityOptions;

  constructor(
    private repo: DecisionRepository,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.form = this.fb.group({
      title: [''],
      description: [''],
      date: [null],
      priority: [''],
      riskFactor: [0],
      feasibility: [0],
      pros: [[]],
      cons: [[]],
    });
  }

  addItem(field: 'pros' | 'cons', event: MatChipInputEvent): void {
    addChipItem(this.form, field, event);
  }

  removeItem(field: 'pros' | 'cons', index: number): void {
    removeChipItem(this.form, field, index);
  }

  onSubmit() {
    if (this.form.valid) {
      const newDecision = normalizeDecisionDate(this.form.value);
      this.repo
        .createDecision(newDecision)
        .pipe(take(1)) // Ensure we only take the first emitted value
        .subscribe({
          next: () => {
            this.snackBar.open('Decision created successfully!', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-success'],
            });
          },
          error: (error) => {
            this.snackBar.open('Error creating decision.', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error'],
            });
          },
        });
    }
  }

  goBack() {
    this.location.back();
  }
}

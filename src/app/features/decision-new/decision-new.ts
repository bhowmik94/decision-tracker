import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DecisionRepository } from '../../repositories/decision.repository';
import { Decision } from '../../models/decision.model';

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
  priorityOptions: string[] = ['critical', 'important', 'moderate', 'optional'];

  constructor(
    private route: ActivatedRoute,
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
    const value = (event.value || '').trim();
    if (value) {
      const current = this.form.value[field] as string[];
      this.form.get(field)?.setValue([...current, value]);
    }
    event.chipInput!.clear();
  }

  removeItem(field: 'pros' | 'cons', index: number): void {
    const current = this.form.value[field] as string[];
    if (index >= 0) {
      current.splice(index, 1);
      this.form.get(field)?.setValue([...current]);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Submitting', this.form.value);
      const newDecision = {
        ...this.form.value,
        date:
          this.form.value && this.form.value.date instanceof Timestamp
            ? this.form.value.date.toDate()
            : this.form.value
            ? this.form.value.date
            : null,
      };
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

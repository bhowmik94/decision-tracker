import { Component } from '@angular/core';
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

@Component({
  selector: 'app-decision-edit',
  standalone: true,
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
  ],
  templateUrl: './decision-edit.html',
  styleUrl: './decision-edit.scss',
})
export class DecisionEdit {
  decisionID!: string;
  decision!: Decision | null;

  form: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  priorityOptions: string[] = [
    'critical',
    'important',
    'moderate',
    'optional',
  ];

  constructor(
    private route: ActivatedRoute,
    private repo: DecisionRepository,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.route.paramMap.subscribe((params) => {
      this.decisionID = params.get('id')!;
      console.log('Editing decision with ID:', this.decisionID);
    });

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

  ngOnInit(): void {
    this.repo.getDecisionById(this.decisionID).subscribe((data) => {
      this.decision = data;

      // Patch form values here
      this.form.patchValue({
        title: data.title,
        description: data.description,
        date: (data.date as Timestamp).toDate(), // Ensure Date object
        priority: data.priority,
        riskFactor: data.riskFactor,
        feasibility: data.feasibility,
        pros: data.pros || [],
        cons: data.cons || [],
      });

      // Reassign decision to ensure date is in correct format
      // This is useful if we want to use the decision object later
      this.decision = this.form.value as Decision;
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

      const current = this.form.value;

      // Normalize original decision
      const original = {
        ...this.decision,
        date:
          this.decision && this.decision.date instanceof Timestamp
            ? this.decision.date.toDate()
            : this.decision
            ? this.decision.date
            : null,
      };

      // Deep comparison using JSON
      const unchanged = JSON.stringify(current) === JSON.stringify(original);

      if (unchanged) {
        this.snackBar.open('No changes made to the form.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-info'],
        });
        return;
      }

      this.repo
        .updateDecision(this.decisionID, this.form.value)
        .pipe(take(1)) // Ensure we only take the first emitted value
        .subscribe({
          next: () => {
            this.snackBar.open('Decision updated successfully!', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-success'],
            });
          },
          error: (error) => {
            this.snackBar.open('Error updating decision.', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error'],
            });
          },
        });
    }
  }
}

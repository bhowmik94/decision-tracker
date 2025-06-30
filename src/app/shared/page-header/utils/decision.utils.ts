import { Timestamp } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

// Utility function to normalize decision date
// Converts Firestore Timestamp to JavaScript Date object
export function normalizeDecisionDate(decision: any): any {
  return {
    ...decision,
    date: decision?.date instanceof Timestamp
      ? decision.date.toDate()
      : decision?.date ?? null,
  };
}

// Function to add a chip item to the form control
export function addChipItem(
  form: FormGroup,
  field: 'pros' | 'cons',
  event: MatChipInputEvent
): void {
  const value = (event.value || '').trim();
  if (value) {
    const current = form.value[field] as string[] || [];
    form.get(field)?.setValue([...current, value]);
  }
  event.chipInput?.clear();
}

// Function to remove a chip item from the form control
export function removeChipItem(
  form: FormGroup,
  field: 'pros' | 'cons',
  index: number
): void {
  const current = form.value[field] as string[];
  if (index >= 0) {
    current.splice(index, 1);
    form.get(field)?.setValue([...current]);
  }
}
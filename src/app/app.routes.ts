import { Routes } from '@angular/router';
import { Decisions } from './features/decisions/decisions';
import { DecisionEdit } from './features/decision-edit/decision-edit';
import { DecisionNew } from './features/decision-new/decision-new';

export const routes: Routes = [
  {
    path: '',
    component: Decisions,
  },
  {
    path: 'decision/edit/:id',
    component: DecisionEdit,
  },
  {
    path: 'decisions/new',
    component: DecisionNew,
  }
];

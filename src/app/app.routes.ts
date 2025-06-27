import { Routes } from '@angular/router';
import { Decisions } from './features/decisions/decisions';
import { DecisionEdit } from './features/decision-edit/decision-edit';

export const routes: Routes = [
  {
    path: '',
    component: Decisions,
  },
  {
    path: 'decision/edit/:id',
    component: DecisionEdit,
  },
];

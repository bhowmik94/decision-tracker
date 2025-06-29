import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Decision } from '../models/decision.model';
import { DecisionService } from '../services/decision.service';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DecisionRepository {
  constructor(private decisionService: DecisionService) {}

  getAllDecisions(): Observable<Decision[]> {
    // Can also add caching or transformation here later
    return this.decisionService.fetchDecisions();
  }

  getDecisionById(id: string): Observable<Decision> {
    return this.decisionService.fetchDecisionById(id);
  }

  updateDecision(id: string, data: Partial<Decision>): Observable<Decision> {
    return from(this.decisionService.updateDecision(id, data)).pipe(
      switchMap(() => this.decisionService.fetchDecisionById(id)) // fetch the updated document
    );
  }

  createDecision(data: Omit<Decision, 'id'>): Observable<Decision> {
    return from(this.decisionService.createDecision(data)).pipe(
      switchMap((newDecision) =>
        this.decisionService.fetchDecisionById(newDecision.id)
      )
    );
  }
}

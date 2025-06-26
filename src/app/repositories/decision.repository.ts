import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Decision } from '../models/decision.model';
import { DecisionService } from '../services/decision.service';

@Injectable({
  providedIn: 'root'
})
export class DecisionRepository {
  constructor(private decisionService: DecisionService) {}

  getAllTools(): Observable<Decision[]> {
    // Can also add caching or transformation here later
    return this.decisionService.fetchDecisions();
  }
}
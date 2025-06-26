import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Decision } from '../models/decision.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecisionService {

  constructor(private firestore: Firestore) {}

  fetchDecisions(): Observable<Decision[]> {
    const decisionCollection = collection(this.firestore, 'decisions');
    return collectionData(decisionCollection, { idField: 'id' }) as Observable<Decision[]>;
  }
}
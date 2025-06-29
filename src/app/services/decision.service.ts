import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  setDoc,
  doc,
  updateDoc,
  docData,
} from '@angular/fire/firestore';
import { Decision } from '../models/decision.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DecisionService {
  constructor(private firestore: Firestore) {}

  fetchDecisions(): Observable<Decision[]> {
    const decisionCollection = collection(this.firestore, 'decisions');
    return collectionData(decisionCollection, { idField: 'id' }) as Observable<
      Decision[]
    >;
  }

  fetchDecisionById(id: string): Observable<Decision> {
    const decisionDoc = doc(this.firestore, `decisions/${id}`);
    return docData(decisionDoc, { idField: 'id' }) as Observable<Decision>;
  }

  updateDecision(decisionId: string, data: Partial<Decision>): Promise<void> {
    const decisionDocRef = doc(this.firestore, 'decisions', decisionId);
    return updateDoc(decisionDocRef, data);
  }

  createDecision(data: Omit<Decision, 'id'>): Promise<Decision> {
    const decisionCollection = collection(this.firestore, 'decisions');
    const newDocRef = doc(decisionCollection); // auto-ID
    const newDecision = { ...data, id: newDocRef.id };
    return setDoc(newDocRef, newDecision).then(() => newDecision);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';

import { Decision } from '../../models/decision.model';
import { DecisionRepository } from '../../repositories/decision.repository';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-decisions',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './decisions.html',
  styleUrl: './decisions.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class Decisions {
  displayedColumns: string[] = [
    'title',
    'date',
    'priority',
    'riskFactor',
    'feasibility',
    'actions',
  ];
  dataSource = new MatTableDataSource<Decision>();

  constructor(private repo: DecisionRepository) {}

  ngOnInit(): void {
    this.repo.getAllTools().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  expandedDecision: Decision | null = null;
  viewDetails(decision: Decision) {
    // implement navigation or modal later
    console.log('Viewing', decision);
  }
}

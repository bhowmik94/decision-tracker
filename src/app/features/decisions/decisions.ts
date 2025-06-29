import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';

import { Decision } from '../../models/decision.model';
import { DecisionRepository } from '../../repositories/decision.repository';
import { PageHeader } from '../../shared/page-header/page-header';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Router } from '@angular/router';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-decisions',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    PageHeader,
    MatPaginatorModule,
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
  expandedDecision: Decision | null = null;

  constructor(private repo: DecisionRepository, private router: Router) {}

  ngOnInit(): void {
    this.repo.getAllDecisions().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.data = this.dataSource.data.map((d) => ({
        ...d,
        date: d.date instanceof Timestamp ? d.date.toDate() : d.date,
      }));
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editDetails(decision: Decision) {
    this.router.navigate(['/decision/edit', decision.id]);
  }

  createNewDecision() {
    this.router.navigate(['/decisions/new']);
  }
}

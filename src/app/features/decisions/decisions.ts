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
import { MatIcon } from '@angular/material/icon';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialog } from '../confirm-delete-dialog/confirm-delete-dialog';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Router } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatIcon,
    ConfirmDeleteDialog,
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

  constructor(
    private repo: DecisionRepository,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

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

  confirmDelete(decision: Decision): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      width: '300px',
      data: decision,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteDecision(decision.id);
        console.log('Decision deleted:', decision.id);
      }
    });
  }

  deleteDecision(id: string): void {
    this.repo.deleteDecision(id).subscribe({
      next: () => {
        console.log('Decision deleted successfully:', id);

        // Remove the deleted decision from the data source
        // This ensures the UI updates immediately without needing to refetch data
        this.dataSource.data = this.dataSource.data.filter(
          (decision) => decision.id !== id
        );
        this.snackBar.open('Decision deleted successfully', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success'],
        });
      },
      error: (error) => {
        console.error('Error deleting decision:', error);
        this.snackBar.open('Error deleting decision', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      },
    });
  }
}

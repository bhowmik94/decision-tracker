import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';

import { Decision } from '../../models/decision.model';
import { DecisionRepository } from '../../repositories/decision.repository';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-decisions',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule],
  templateUrl: './decisions.html',
  styleUrl: './decisions.scss',
})
export class Decisions {
  displayedColumns: string[] = [
    'title',
    'date',
    'rating',
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

  viewDetails(decision: Decision) {
    // implement navigation or modal later
    console.log('Viewing', decision);
  }
}

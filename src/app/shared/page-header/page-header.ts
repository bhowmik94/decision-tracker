import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss'
})
export class PageHeader {
  @Input() title: string = '';
  @Input() showBackButton: boolean = false;
  @Input() showNewButton: boolean = false;

  @Output() back = new EventEmitter<void>();
  @Output() new = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }

  onNew() {
    this.new.emit();
  }
}

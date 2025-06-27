import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-decision-edit',
  imports: [],
  templateUrl: './decision-edit.html',
  styleUrl: './decision-edit.scss'
})
export class DecisionEdit {
  decisionID!: string;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.decisionID = params.get('id')!;
      console.log('Editing decision with ID:', this.decisionID);
    });
  }

}

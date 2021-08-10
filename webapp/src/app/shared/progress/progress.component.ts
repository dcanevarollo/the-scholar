import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {

  @Input() type?: 'bar' | 'spinner';
  @Input() mode: 'determinate' | 'indeterminate' = 'indeterminate';
  @Input() error: boolean | null = false;

  constructor() { }

}

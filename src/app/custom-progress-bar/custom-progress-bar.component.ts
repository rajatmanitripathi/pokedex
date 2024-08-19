import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-progress-bar',
  templateUrl: './custom-progress-bar.component.html',
  styleUrl: './custom-progress-bar.component.scss'
})
export class CustomProgressBarComponent {
  @Input() value: number = 0;
  @Input() color: string = '#3f51b5';
}

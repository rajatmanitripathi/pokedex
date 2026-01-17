import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-progress-bar',
  templateUrl: './custom-progress-bar.component.html',
  styleUrl: './custom-progress-bar.component.scss'
})
export class CustomProgressBarComponent {
  @Input() value: number = 0;
  @Input() color: string = '#e6281d';
  @Input() borderColor: string = '#ffcc00';

  // maxStars: number = 5;
  // stars: number[] = Array(this.maxStars).fill(0);
  // filledStars!: number;
  // halfStar!: boolean;

  // ngOnInit() {
  //   this.calculateStars();
  // }

  // calculateStars() {
  //   const starsValue = (this.value / 100) * this.maxStars;
  //   this.filledStars = Math.floor(starsValue);
  //   this.halfStar = starsValue % 1 !== 0;
  // }
}

import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('flipState', [
      state('sideB', style({
        transform: 'rotateY(179.9deg)'
      })),
      state('sideA', style({
        transform: 'rotateY(0)'
      })),
      transition('sideB => sideA', animate('500ms ease-out')),
      transition('sideA => sideB', animate('500ms ease-in'))
    ])
  ]
})
export class AboutComponent implements OnInit {

  cardFlip: string = 'sideA';

  constructor() { }

  ngOnInit() {
  }

  toggleFlip() {
    console.log("clicked");
    this.cardFlip = (this.cardFlip === 'sideA') ? 'sideB' : 'sideA';
  }
}

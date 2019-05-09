import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Product } from '../_models/product.model';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    animations: [
        trigger('flipState', [
            state('sideB', style({
                transform: 'rotateY(180deg)'
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

    constructor() { }

    ngOnInit() {
    }
}
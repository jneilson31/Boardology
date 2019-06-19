import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition, useAnimation } from '@angular/animations';
import { slideInLeft, slideOutLeft } from 'ng-animate';


@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    animations: [
        trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft, {
            params: {timing: 1}
        }))])
    ],
})

export class AboutComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    onClick() {
        
    }
}
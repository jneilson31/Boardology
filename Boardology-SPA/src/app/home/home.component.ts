import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories: string[] = [
    "All",
    "Adventure",
    // "Action",
    "Board",
    "Card",
    "Childrens",
    "Dice",
    "Educational",
    // "Expansion",
    "Exploration",
    "Humor",
    "Memory",
    // "Miniatures",
    // "Movies & Television",
    // "Murder",
    "Mystery",
    "Party",
    "Sports",
    // "Wargame",
    "Word",
    // "Zombies",
  ]

  constructor() { }

  ngOnInit() {
  }

}

import { Component } from '@angular/core';

interface Card {
  icon: string;
  title: string;
  text: string;
}

const CARDS: Card[] = [
  {
    icon: 'school',
    title: 'Organize courses',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
  },
  {
    icon: 'people',
    title: 'Manage students',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
  },
  {
    icon: 'storage',
    title: 'Storage',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
  }
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  cards = CARDS;

  constructor() { }

}

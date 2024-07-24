import { Component, OnInit } from '@angular/core';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faBuilding = faBuilding;
  constructor() { }

  ngOnInit(): void {
  }

}

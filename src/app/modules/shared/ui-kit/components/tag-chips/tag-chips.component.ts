import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag-chips',
  templateUrl: './tag-chips.component.html',
  styleUrls: ['./tag-chips.component.scss'],
})
export class TagChipsComponent  implements OnInit {

  @Input() tag: string[] = [];
  @Input() favoriteTag: string[] = []

  constructor() { }

  ngOnInit() {}

  tagMatchesFavorite(tag: string) {
    return this.favoriteTag?.includes(tag);
  }

}

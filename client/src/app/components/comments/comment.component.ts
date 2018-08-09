import { Component, Input, OnInit } from '@angular/core';

import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})

export class CommentComponent {
  @Input() comment: Comment;
  @Input() post: string;
  @Input() position: string = '1';

  background: string;
  initialName: string;
  positionId: string;
  positionUrl: string;

  ngOnInit() {
    let colors =
      ['HotPink', 'DeepPink', 'MediumVioletRed',
       'Crimson', 'FireBrick', 'OrangeRed',
       'DarkOrange', 'Orange', 'DarkKhaki',
       'Gold', 'Tan', 'RosyBrown',
       'DarkGoldenrod', 'Peru', 'Maroon',
       'Olive', 'LimeGreen', 'ForestGreen',
       'SeaGreen', 'Aqua', 'Turquoise',
       'LightSeaGreen', 'DarkCyan', 'LightSteelBlue',
       'SteelBlue', 'DarkBlue', 'Navy',
       'Orchid', 'Fuchsia', 'DarkViolet',
       'DarkMagenta', 'DarkSlateBlue', 'Gray'];

    this.background = colors[Math.floor(Math.random() * 36)];

    this.initialName = this.comment.author.charAt(0).toUpperCase();

    this.positionId = `comment${this.position}`;
    this.positionUrl = `#${this.positionId}`;
  }
}

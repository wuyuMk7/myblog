import { Component, Input } from '@angular/core';

import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})

export class ListComponent {
  @Input() comments: Comment[];
  @Input() post: string;

  getChildrenPosition(i: number, j: number): string {
    return `${i + 1}-${j + 1}`;
  }
}

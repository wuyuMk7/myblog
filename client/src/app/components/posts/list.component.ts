import { Component, Input } from '@angular/core';

import { Post } from '../../models/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})

export class PostListComponent {
  @Input() posts: Post[];
}

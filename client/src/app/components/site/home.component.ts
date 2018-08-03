import { Component, OnInit } from '@angular/core';

import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  posts: Post[] = [];

  constructor (private postService: PostService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void{
    this.postService.getPosts()
      .subscribe(posts => this.posts = posts);
  }
}

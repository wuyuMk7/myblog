import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})

export class DetailComponent implements OnInit {
  post: Post;
  items = [
    {
      "link": "/",
      "content": "HOME"
    },
    {
      "link": "",
      "content": "201807"
    }
  ];

  constructor (
    private postService: PostService,
    private location: Location,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    const title = this.route.snapshot.paramMap.get('title');
    console.log(title);
    this.postService.getPost(title)
      .subscribe(post => this.post = post);
  }

  goBack(): void {
    this.location.back();
  }
}


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
  commentLength: number = 0;
  public post: Post;
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
  writer = {
    name: "YANG HE",
    avatar: "//s.gravatar.com/avatar/49677927211dcb1083a81bc66cf9152a?s=80",
    intro: "Allow easy discovery of Tweets by topic by including a comma-separated list of hashtag values without the preceding",
    social: {
      twitter: {
        name: "hYang",
        screen_name: "hyMeldon",
      },
      github: {
        name: "wuyuMk7",
        screen_name: "wuyuMk7",
      },
      facebook: {
        name: "YANG HE",
        screen_name: "wuyuMk7",
      },
      weibo: {
        name: "wuyuMk7",
        screen_name: "hyunsl",
      }
    }
  };

  shareParams = {
    url: window.location.href,
    title: "12345",
    text: "78990",
    hashtags: "",
    twitter: {
      via: "hyMeldon",
    }
  }

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
    //console.log(title);
    this.postService.getPost(title)
      .subscribe(post =>{
        this.post = post;
        this.commentLength = post.comments.reduce((ac, c) => ac + 1 + c.replies.length, 0);
      });
  }

  goBack(): void {
    this.location.back();
  }
}


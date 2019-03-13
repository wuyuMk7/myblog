import { Component, OnInit } from '@angular/core';

import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

import * as moment from 'moment';

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
      .subscribe(resp => {
        if (resp['status'] == 'success') {
          let data = resp['data'];
          if (data['posts'] && data['posts']) {
            for (let post of data['posts']){
              //this.posts.push(new Post(post));
              let newPost = new Post({
                id: 0,
                title: post['title'],
                url: post['url'],
                tags: post['tags'],
                desc: post['desc'],
                content: '',
                comemnts: [],
                createdAt: post['createdAt'],
                viewCount: 0,
                commentCount: 0,
                like: post['like'],
              });

              newPost.period = moment(post['createdAt']).fromNow();
              this.posts.push(newPost);
            }
          }
        }
      });
  }
}

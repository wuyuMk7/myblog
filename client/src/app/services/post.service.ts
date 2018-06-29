import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Post } from '../models/post';

@Injectable({
    providedIn: 'root',
})

export class PostService {
  posts: Post[] = [
    {
      id: 1,
      title: 'test',
      url: 'test',
      tags: [],
      desc: 'test123',
      content: '',
      comments: [],
      createdAt: '123',
      viewCount: 10,
      commentCount: 0,
      like: 5,
    },
    {
      id: 2,
      title: 'test2',
      url: 'test2',
      tags: [],
      desc: 'test456',
      content: '',
      comments: [],
      createdAt: '123',
      viewCount: 10,
      commentCount: 0,
      like: 5,

    },
  ];

  getPosts(): Observable<Post[]> {
    return of(this.posts);
  }
}

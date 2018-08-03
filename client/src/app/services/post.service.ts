import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import * as moment from 'moment';

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
      content: 'faawrwrag',
      comments: [],
      createdAt: '2018-07-22T08:00:23Z',
      viewCount: 10,
      commentCount: 0,
      like: 5,
    },
    {
      id: 2,
      title: 'test2',
      url: 'test2',
      tags: ["1","bb","qq"],
      desc: 'Detailed instructions for obtaining and building Fuchsia are available from the Getting Started guide, but we\'ll assume here that the target system is x86-based and that you want to build a complete system. To configure our build for this we can run fx set x64 and then build with fx full-build ...',
      content: 'test45678',
      comments: [],
      createdAt: '2018-07-20T12:23:30Z',
      viewCount: 10,
      commentCount: 0,
      like: 5,
    },
  ];

  constructor() {
    this.posts.map(post => post.period = moment(post.createdAt).fromNow());
  }

  getPosts(): Observable<Post[]> {
    return of(this.posts);
  }

  getPost(name: string): Observable<Post> {
    return of(this.posts[1]);
  }

  getPostById(id: string): Observable<Post> {
    return of(this.posts[1]);
  }
}

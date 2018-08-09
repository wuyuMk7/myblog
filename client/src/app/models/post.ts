import * as moment from 'moment';

import { Comment } from './comment';

export class Post {
  id: string;
  title: string;
  url: string;
  tags: string[];
  desc: string;
  content: string;
  comments: Comment[];
  createdAt: string;
  period?: string;
  viewCount: number;
  commentCount: number;
  like: number;

  constructor() {}
}

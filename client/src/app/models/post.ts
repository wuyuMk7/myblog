import { Comment } from './comment'

export class Post {
  id: number;
  title: string;
  url: string;
  tags: string[];
  desc: string;
  content: string;
  comments: Comment[];
  createdAt: string;
  viewCount: number;
  commentCount: number;
  like: number;
}

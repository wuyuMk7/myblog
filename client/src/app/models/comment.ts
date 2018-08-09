export class Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  replies: Comment[];
}

export class Comment {
    id: number;
    title: string;
    author: string;
    email: string;
    content: string;
    reply: boolean;
    replies: Comment[];
}

import { ArticleComment } from './article-comment.model';

export interface Article {
     id: number;
     title: string;
     content: string;
     created: Date;
     photoUrl: string;
     dateCreated: Date;
     author: string;
     comments: number;
}

export interface ArticleComment {
    id: number;
    articleId: number;
    content: string;
    created: Date;
    userId: number;
    userName: string;
}

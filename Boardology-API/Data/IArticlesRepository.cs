using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boardology.API.Dtos;
using Boardology.API.Helpers;
using Boardology.API.Models;

namespace Boardology.API.Data
{
	public interface IArticlesRepository
	{
		Task<List<Article>> GetArticles();
		Task<Article> GetArticle(int id);
		Task<Article> IncreaseArticleComments(int articleId);
        Task<Article> DecreaseArticleComments(int articleId);
        Task<PagedList<ArticleCommentDto>> GetArticleComments(int articleId, CommentParams commentParams);
        Task<ArticleComment> GetArticleComment(int articleCommentId);
	}
}

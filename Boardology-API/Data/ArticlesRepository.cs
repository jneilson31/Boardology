using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boardology.API.Dtos;
using Boardology.API.Helpers;
using Boardology.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Boardology.API.Data
{
	public class ArticlesRepository : IArticlesRepository
	{
		private readonly DataContext _context;

		public ArticlesRepository(DataContext context)
		{
			_context = context;
		}


		public async Task<List<Article>> GetArticles()
		{
			var articles = await _context.Articles.OrderByDescending(d => d.DateCreated).ToListAsync();
			return articles;
		}

		public async Task<Article> GetArticle(int id)
		{
			var article = await _context.Articles.FirstOrDefaultAsync(u => u.Id == id);
			return article;
		}

		public async Task<Article> IncreaseArticleComments(int articleId)
		{
			var article = await _context.Articles.FirstOrDefaultAsync(u => u.Id == articleId);
			if (article != null)
			{
				article.Comments = article.Comments + 1;
			}
			return article;

		}
        public async Task<Article> DecreaseArticleComments(int articleId)
        {
            var article = await _context.Articles.FirstOrDefaultAsync(u => u.Id == articleId);
            if (article != null)
            {
                article.Comments = article.Comments - 1;
            }
            return article;

        }

        public async Task<PagedList<ArticleCommentDto>> GetArticleComments(int articleId, CommentParams commentParams)
        {

            var commentList =
                (from articleComments in _context.ArticleComments
                 join users in _context.Users
                 on articleComments.UserId equals users.Id
                 where articleComments.ArticleId == articleId
                 orderby articleComments.Created descending
                 select new ArticleCommentDto
                 {
                     Id = articleComments.Id,
                     ArticleId = articleComments.ArticleId,
                     Content = articleComments.Content,
                     Created = articleComments.Created,
                     UserId = articleComments.UserId,
                     UserName = users.UserName
                 });


            return await PagedList<ArticleCommentDto>.CreateAsync(commentList, commentParams.PageNumber, commentParams.PageSize);

        }

        public async Task<ArticleComment> GetArticleComment(int articleCommentId)
        {
            var comment = await _context.ArticleComments.FirstOrDefaultAsync(u => u.Id == articleCommentId);
            return comment;
        }
    }
}

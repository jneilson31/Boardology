using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public async Task<IList> GetArticleComments(int articleId)
        {

            var commentList = await
                (from articleComments in _context.ArticleComments
                 join users in _context.Users
                 on articleComments.UserId equals users.Id
                 where articleComments.ArticleId == articleId
                 orderby articleComments.Created descending
                 select new
                 {
                     articleComments.Id,
                     articleComments.ArticleId,
                     articleComments.Content,
                     articleComments.Created,
                     articleComments.UserId,
                     users.UserName
                 }).Take(5).ToListAsync();


            return commentList;

        }

        public async Task<ArticleComment> GetArticleComment(int articleCommentId)
        {
            var comment = await _context.ArticleComments.FirstOrDefaultAsync(u => u.Id == articleCommentId);
            return comment;
        }
    }
}

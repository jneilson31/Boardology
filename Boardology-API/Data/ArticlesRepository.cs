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


	}
}

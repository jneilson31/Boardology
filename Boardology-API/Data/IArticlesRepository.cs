using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boardology.API.Models;

namespace Boardology.API.Data
{
	public interface IArticlesRepository
	{
		Task<List<Article>> GetArticles();
		Task<Article> GetArticle(int id);
		Task<Article> IncreaseArticleComments(int articleId);
	}
}

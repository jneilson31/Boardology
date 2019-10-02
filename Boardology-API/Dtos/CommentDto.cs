using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boardology.API.Dtos
{
    public class CommentDto
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
    }
}

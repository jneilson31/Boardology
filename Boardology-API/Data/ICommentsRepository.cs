using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boardology.API.Models;

namespace Boardology.API.Data
{
    public interface ICommentsRepository
    {
        Task IncreaseComments(int gameId);
        Task DecreaseComments(int gameId);
    }
}

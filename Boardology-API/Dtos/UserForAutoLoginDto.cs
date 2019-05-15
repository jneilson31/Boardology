using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boardology.API.Dtos
{
    public class UserForAutoLoginDto
    {
        public string id { get; set; }
        public string token { get; set; }
    }
}

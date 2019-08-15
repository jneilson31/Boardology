using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boardology.API.Dtos
{
    public class ChangePasswordDto
    {
        public string id { get; set; }
        public string token { get; set; }
        public string newPassword { get; set; }
    }
}

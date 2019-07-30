using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boardology.API.Dtos
{
    public class UserEmailAddress
    {
        public string Email { get; set; }
    }

    public class ContactUsEmail
    {
        public string Email { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }
}

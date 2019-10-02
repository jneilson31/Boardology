using AutoMapper;
using Boardology.API.Dtos;
using Boardology.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boardology.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForRegisterDto>(); // if we want to return anything else in local storage on sign in
            CreateMap<Comment, CommentDto>();
        }
    }
}

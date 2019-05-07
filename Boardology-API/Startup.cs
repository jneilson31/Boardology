using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Boardology.API.Data;
using Boardology.API.Helpers;
using Boardology.API.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Boardology.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            IdentityBuilder builder = services.AddIdentityCore<User>(opt =>
            {
                opt.Password.RequireDigit = false;
                opt.Password.RequireLowercase = false;
                opt.Password.RequiredLength = 6;
                opt.Password.RequireNonAlphanumeric = false;
                opt.Password.RequireUppercase = false;
            });

            builder = new IdentityBuilder(builder.UserType, typeof(Role), builder.Services); // probably only need this if I want users and roles
            builder.AddEntityFrameworkStores<DataContext>();
            builder.AddSignInManager<SignInManager<User>>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
            .AddJsonOptions(opt =>
             {
                 opt.SerializerSettings.ReferenceLoopHandling =
                 Newtonsoft.Json.ReferenceLoopHandling.Ignore;
             });
            services.AddDbContext<DataContext>(x => x.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));
            services.AddCors();
            services.AddAutoMapper();
            services.AddTransient<SeedGames>();
            services.AddTransient<SeedUsers>();
            services.AddScoped<IBoardologyRepository, BoardologyRepository>();
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, SeedGames seedGames, SeedUsers seedUsers)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(builder => {
                    builder.Run(async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if (error != null)
                        {
                            context.Response.AddApplicationError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message);
                        }
                    });
                });
                //app.UseHsts();
            }

            //app.UseHttpsRedirection();
            //seedGames.SeedBoardGames();
            //seedUsers.SeedBoardologyUsers();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().SetPreflightMaxAge(new TimeSpan(0, 5, 0)));
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}

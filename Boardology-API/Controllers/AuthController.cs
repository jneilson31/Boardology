using AutoMapper;
using Boardology.API.Data;
using Boardology.API.Dtos;
using Boardology.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace Boardology.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IEmailSender _emailSender;

        public AuthController(IConfiguration config, IMapper mapper, UserManager<User> userManager, SignInManager<User> signInManager, IEmailSender emailSender)
        {
            _config = config;
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
        }

        [HttpPost("register")]

        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {

            var username = await _userManager.FindByNameAsync(userForRegisterDto.Username);

            if (username != null)
            {
                return BadRequest("This username is already taken");
            }

            var userEmail = await _userManager.FindByEmailAsync(userForRegisterDto.Email);

            if (userEmail != null)
            {
                return BadRequest("There is already an account associated with this email");
            }

            var userToCreate = new User
            {
                UserName = userForRegisterDto.Username,
                Email = userForRegisterDto.Email
            };

            var result = await _userManager.CreateAsync(userToCreate, userForRegisterDto.Password);
            
            if (result.Succeeded)
            {
                return StatusCode(201);
            }
            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {

            var user = await _userManager.FindByEmailAsync(userForLoginDto.Email);

            if (user == null)
            {
                return Unauthorized("Something went wrong signing in. Please ensure your information is correct and attempt to sign in again.");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, userForLoginDto.Password, false);


            if (result.Succeeded)
            {
                return Ok(new
                {
                    token = GenerateJwtToken(user)
                    //user if we want to return the user in local storage on sign in
                });
            }

            return Unauthorized("Something went wrong signing in. Please ensure your information is correct and attempt to sign in again.");
            
        }

        [HttpPost("autologin")]
        public async Task<IActionResult> Autologin(UserForAutoLoginDto userForAutoLoginDto)
        {

            var user = await _userManager.FindByIdAsync(userForAutoLoginDto.id);
            if (user == null)
            {
                return BadRequest("Could not find user");
            }

            var newPassword = Guid.NewGuid().ToString();
            var token = userForAutoLoginDto.token.Replace(" ", "+");
            var passwordResult = await _userManager.ResetPasswordAsync(user, token, newPassword);

            var result = await _signInManager.CheckPasswordSignInAsync(user, newPassword, false);



            if (result.Succeeded)
            {
                return Ok(new
                {
                    token = GenerateJwtToken(user)
                });
            }

            return Unauthorized("Something went wrong. Please try resetting your password again.");
            


        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> SendPasswordResetLink(UserEmailAddress email)
        {

            var user = await _userManager.FindByEmailAsync(email.Email);

            if (user == null)
            {
                return Ok();
            }
           
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var callbackUrl = $"http://localhost:4200/?token={token}&id={user.Id}";
            
            await _emailSender.SendEmailAsync(email.Email, "Password Reset Request", $"<p>Hi there {user.UserName},</p><p>Click below to reset your password</p><a href='{callbackUrl}'>Click here</a><hr><p><i>Boardology</i></p>");

            return Ok();
        }

        [HttpPost("contact-us")]
        public async Task<IActionResult> SendContactUsEmail(ContactUsEmail email)
        {
            await _emailSender.SendEmailAsync(email.Email, email.Subject, $"<p>{email.Message}</p>");

            return Ok();
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}

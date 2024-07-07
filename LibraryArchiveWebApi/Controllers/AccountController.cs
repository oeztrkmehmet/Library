using Core.BaseCore;
using Database.Context;
using Database.Entities.UserEntities;
using LibraryArchiveWebApi.Models.Identity;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LibraryArchiveWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : BaseController
    {
        private UserManager<AppUser> _userManager;
        private SignInManager<AppUser> _signInManager;
        private readonly IConfiguration _configuration;
        public AccountController(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager, IConfiguration configuration)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _configuration = configuration;
        }
        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(string userName, string password)
        {
            if (!string.IsNullOrEmpty(userName) && !string.IsNullOrEmpty(password))
            {
                var appUser = await _userManager.FindByNameAsync(userName);
                if (appUser != null)
                {
                    var resp = await _signInManager.CheckPasswordSignInAsync(appUser, password, false);
                    if (resp.Succeeded)
                    {
                        var claims = new List<Claim>
                        {
                            new Claim(ClaimTypes.NameIdentifier, appUser.Id.ToString()),
                            new Claim(ClaimTypes.Name, appUser.UserName),

                        };
                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));
                        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                        var audience = _configuration["JwtSettings:Audience"];
                        var issuer = _configuration["JwtSettings:Issuer"];
                        var token = new JwtSecurityToken(
                            _configuration["JwtSettings:Issuer"],
                            _configuration["JwtSettings:Audience"],
                            claims,
                            expires: DateTime.Now.AddMinutes(1461),
                            signingCredentials: creds
                        );
                        var tokenResp = new JwtSecurityTokenHandler().WriteToken(token);
                        return Ok(tokenResp);
                    }
                    else
                    {
                        return BadRequest("Kullanıcı adı veya parola hatalı.");
                    }
                }
                else
                {
                    return BadRequest("Girdiğiniz kullanıcı adına bağlı bir kayıt bulunamadı.");
                }
            }
            else
            {
                return BadRequest("Lütfen kullanıcı adı ve parolanızı giriniz.");
            }
        }
        [HttpPost("Logout")]
        public IActionResult Logout()
        {
            HttpContext.SignOutAsync();
            return Ok("Çıkış yapıldı.");
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            if (model != null)
            {
                var user = await _userManager.FindByNameAsync(model.UserName);
                if (user == null)
                {
                    if (!string.IsNullOrEmpty(model.UserName) && !string.IsNullOrEmpty(model.Password) && !string.IsNullOrEmpty(model.NameSurname))
                    {
                        AppUser appUser = new AppUser
                        {
                            Email = model.UserName,
                            UserName = model.UserName,
                            PhoneNumber = model.PhoneNumber,
                            NameSurname = model.NameSurname
                        };
                        var resp = await _userManager.CreateAsync(appUser, model.Password);
                        if (resp.Succeeded)
                        {
                            return Created(string.Empty, resp.Succeeded);
                        }
                        else
                        {
                            return BadRequest("Kullanıcı kaydı yapılırken bir sorun oluştu.");
                        }
                    }
                    else
                    {
                        return BadRequest("Lütfen tüm alanları doldurunuz.");
                    }
                }
                else
                {
                    return BadRequest("Girdiğiniz bilgilere ait kullanıcı kaydı mevcuttur.");
                }
            }
            else
            {
                return BadRequest("Model boş gönderilemez.");
            }
        }
    }
}

using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using SportClub.Server.Models;
using Microsoft.EntityFrameworkCore;
using SportClub.Server.Services;

namespace SportClub.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly AuthService _authService;

        public AuthController(AppDbContext context, AuthService authService)
        {
            _context = context;
            _authService = authService ?? throw new ArgumentNullException(nameof(authService));
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Models.RegisterRequest request)
        {
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return BadRequest("Пользователь с таким email уже существует.");
            }

            var salt = _authService.GenerateSalt();
            var saltedHash = _authService.HashPassword(request.Password, salt);

            var user = new Users
            {
                Username = request.Username,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                PasswordHash = saltedHash,
                Role = "User",
                Salt = salt
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var sessionToken = _authService.GenerateSessionToken();
            return Ok(new { Token = sessionToken });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Models.LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
                return Unauthorized("Неверный email или пароль.");

            var saltedHash = _authService.HashPassword(request.Password, user.Salt);

            if (saltedHash != user.PasswordHash)
                return Unauthorized("Неверный email или пароль.");

            var sessionToken = _authService.GenerateSessionToken();
            return Ok(new { Token = sessionToken, User = new { user.Username, user.Email, user.PhoneNumber, user.PasswordHash, user.Salt } });
        }
    }
}

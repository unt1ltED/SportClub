using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportClub.Server.Models;
using SportClub.Server.Services;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly AuthService _authService;

    public UsersController(AppDbContext context, AuthService authService)
    {
        _context = context;
        _authService = authService;
    }

    [HttpGet]
    public async Task<ActionResult<Users>> GetUserByEmail(string email)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null)
        {
            return NotFound();
        }
        return user;
    }

    [HttpPut("{id}/role")]
    public async Task<IActionResult> UpdateUserRole(int id, [FromBody] UpdateRoleDto roleDto)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        user.Role = roleDto.Role;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPut("{id}/change-password")]
    public async Task<IActionResult> ChangePassword(int id, [FromBody] ChangePasswordDto changePasswordDto)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound(new { message = "User not found." });
        }

        var isPasswordValid = _authService.VerifyPassword(changePasswordDto.CurrentPassword, user.PasswordHash, user.Salt);
        if (!isPasswordValid)
        {
            return BadRequest(new { message = "Incorrect current password." });
        }

        var newSalt = _authService.GenerateSalt();
        var newHashedPassword = _authService.HashPassword(changePasswordDto.NewPassword, newSalt);

        user.PasswordHash = newHashedPassword;
        user.Salt = newSalt;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Password changed successfully." });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUserProfile(int id, [FromBody] UpdateProfileDto updateProfileDto)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound(new { message = "User not found." });
        }

        user.Username = updateProfileDto.Username;
        user.Email = updateProfileDto.Email;
        user.PhoneNumber = updateProfileDto.PhoneNumber;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Profile updated successfully." });
    }
}

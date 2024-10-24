using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportClub.Server.Models;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    // Метод для получения пользователя по почте
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

    // Метод для обновления роли пользователя
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
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportClub.Server.Models;

[ApiController]
[Route("api/[controller]")]
public class CoachesController : ControllerBase
{
    private readonly AppDbContext _context;

    public CoachesController(AppDbContext context)
    {
        _context = context;
    }

    // Метод для добавления записи о тренере
    [HttpPost]
    public async Task<IActionResult> AddCoach([FromBody] CoachDto coachDto)
    {
        var coach = new Coaches
        {
            UserId = coachDto.UserId,
            Specialty = coachDto.Specialty
        };

        _context.Coaches.Add(coach);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCoach), new { id = coach.Id }, coach);
    }

    // Пример метода для получения тренера по ID (можете добавить по мере необходимости)
    [HttpGet("{id}")]
    public async Task<ActionResult<Coaches>> GetCoach(int id)
    {
        var coach = await _context.Coaches.FindAsync(id);
        if (coach == null)
        {
            return NotFound();
        }
        return coach;
    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportClub.Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class ScheduleController : ControllerBase
{
    private readonly AppDbContext _context;

    public ScheduleController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> AddTraining([FromBody] TrainingDto trainingDto)
    {
        if (trainingDto == null)
        {
            return BadRequest("Training data is required.");
        }

        var training = new Schedule
        {
            Title = trainingDto.Title,
            DateTime = trainingDto.DateTime,
            TrainerId = trainingDto.TrainerId,
            Capacity = trainingDto.Capacity,
            BookedSlots = 0
        };

        _context.Schedules.Add(training);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTraining), new { id = training.Id }, training);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Schedule>> GetTraining(int id)
    {
        var training = await _context.Schedules.FindAsync(id);
        if (training == null)
        {
            return NotFound();
        }
        return training;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllTrainings()
    {
        var trainings = await _context.Schedules.ToListAsync();

        var response = trainings.Select(t => new TrainingResponseDto
        {
            Id = t.Id,
            Title = t.Title,
            DateTime = t.DateTime,
            Capacity = t.Capacity,
            BookedSlots = t.BookedSlots
        }).ToList();

        return Ok(response);
    }
}

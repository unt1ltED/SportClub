using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportClub.Server.Models;

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

    [HttpPost("{id}/book")]
    public async Task<IActionResult> BookTraining(int id, [FromBody] BookingRequest request)
    {
        var training = await _context.Schedules.FindAsync(id);
        if (training == null)
        {
            return NotFound(new { message = "Training not found" });
        }

        var existingBooking = await _context.Bookings
            .AnyAsync(b => b.ScheduleId == id && b.ClientId == request.ClientId);

        if (existingBooking)
        {
            return BadRequest(new { message = "User is already booked for this training session." });
        }

        if (training.BookedSlots >= training.Capacity)
        {
            return BadRequest(new { message = "No available slots for this training session." });
        }

        var booking = new Booking
        {
            ClientId = request.ClientId,
            ScheduleId = id,
            BookingDate = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss") 
        };

        _context.Bookings.Add(booking);

        training.BookedSlots += 1;
        _context.Schedules.Update(training);

        await _context.SaveChangesAsync();

        return Ok(new { message = "Booking successful", bookedSlots = training.BookedSlots });
    }


    [HttpGet("client/{clientId}")]
    public async Task<IActionResult> GetTrainingsByClient(int clientId)
    {
        var bookings = await _context.Bookings
            .Where(b => b.ClientId == clientId)
            .Include(b => b.Schedule)
            .ToListAsync();

        var response = bookings.Select(b => new TrainingResponseDto
        {
            Id = b.Schedule.Id,
            Title = b.Schedule.Title,
            DateTime = b.Schedule.DateTime,
            Capacity = b.Schedule.Capacity,
            BookedSlots = b.Schedule.BookedSlots
        }).ToList();

        if (!response.Any())
        {
            return NotFound();
        }

        return Ok(response);
    }
}

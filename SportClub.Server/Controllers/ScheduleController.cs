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

    // Метод для записи пользователя на тренировку
    [HttpPost("{id}/book")]
    public async Task<IActionResult> BookTraining(int id, [FromBody] BookingRequest request)
    {
        var training = await _context.Schedules.FindAsync(id);
        if (training == null)
        {
            return NotFound(new { message = "Training not found" });
        }

        // Проверяем, не записан ли уже пользователь на эту тренировку
        var existingBooking = await _context.Bookings
            .FirstOrDefaultAsync(b => b.TrainingSessionId == id && b.ClientId == request.ClientId);

        if (existingBooking != null)
        {
            return BadRequest(new { message = "User is already booked for this training session." });
        }

        // Проверка, есть ли свободные места
        if (training.BookedSlots >= training.Capacity)
        {
            return BadRequest(new { message = "No available slots for this training session." });
        }

        // Создаем запись о бронировании
        var booking = new Booking
        {
            ClientId = request.ClientId,
            TrainingSessionId = id,
            BookingDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")
        };

        _context.Bookings.Add(booking);

        // Обновляем количество забронированных мест
        training.BookedSlots += 1;
        _context.Schedules.Update(training);

        await _context.SaveChangesAsync();

        return Ok(new { message = "Booking successful", bookedSlots = training.BookedSlots });
    }

    // Метод для получения забронированных тренировок пользователя
    [HttpGet("booked/{clientId}")]
    public async Task<IActionResult> GetBookedTrainings(int clientId)
    {
        var bookedTrainings = await _context.Bookings
            .Where(b => b.ClientId == clientId)
            .Select(b => b.TrainingSessionId)
            .ToListAsync();

        return Ok(bookedTrainings);
    }
}

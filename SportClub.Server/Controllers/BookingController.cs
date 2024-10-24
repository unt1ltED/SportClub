using Microsoft.AspNetCore.Mvc;
using SportClub.Server.Models;

[Route("api/[controller]")]
[ApiController]
public class BookingController : ControllerBase
{
    private readonly AppDbContext _context;

    public BookingController(AppDbContext context)
    {
        _context = context;
    }

    // POST: api/booking
    [HttpPost]
    public async Task<IActionResult> BookTraining([FromBody] BookingRequest request)
    {
        // Проверяем, существует ли тренировка
        var training = await _context.Schedules.FindAsync(request.TrainingId);
        if (training == null)
        {
            return NotFound(new { message = "Training not found" });
        }

        // Проверяем, доступно ли еще место
        if (training.BookedSlots >= training.Capacity)
        {
            return BadRequest(new { message = "No available slots for this training" });
        }

        // Создаем новую запись в таблице Booking
        var booking = new Booking
        {
            ClientId = request.ClientId,
            TrainingSessionId = request.TrainingId
        };
        _context.Bookings.Add(booking);

        training.BookedSlots += 1;
        _context.Schedules.Update(training);

        await _context.SaveChangesAsync();

        return Ok(new { newBookedSlots = training.BookedSlots });
    }


}
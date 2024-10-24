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

    [HttpPost]
    public async Task<IActionResult> BookTraining([FromBody] BookingRequest request)
    {
        var training = await _context.Schedules.FindAsync(request.TrainingId);
        if (training == null)
        {
            return NotFound(new { message = "Training not found" });
        }

        if (training.BookedSlots >= training.Capacity)
        {
            return BadRequest(new { message = "No available slots for this training" });
        }

        var booking = new Booking
        {
            ClientId = request.ClientId,
            ScheduleId = request.TrainingId
        };
        _context.Bookings.Add(booking);

        training.BookedSlots += 1;
        _context.Schedules.Update(training);

        await _context.SaveChangesAsync();

        return Ok(new { newBookedSlots = training.BookedSlots });
    }


}
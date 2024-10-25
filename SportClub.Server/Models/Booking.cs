using SportClub.Server.Models;

public class Booking
{
    public int Id { get; set; }
    public int ClientId { get; set; }
    public int ScheduleId { get; set; }
    public string BookingDate { get; set; }

    public virtual Schedule Schedule { get; set; }
}

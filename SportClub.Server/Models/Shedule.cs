public class Schedule
{
    public int Id { get; set; }
    public string Title { get; set; }
    public DateTime DateTime { get; set; }
    public int TrainerId { get; set; }
    public int Capacity { get; set; }
    public int BookedSlots { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; }
}

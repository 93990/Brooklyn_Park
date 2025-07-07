namespace Brooklyn.Models
{
	public class Shift
	{
		public long ShiftId { get; set; }
		public string ShiftName { get; set; }
		public TimeSpan StartTime { get; set; }
		public TimeSpan EndTime { get; set; }
	}
}

namespace Brooklyn.Dtos
{
	public class ShiftDto
	{
		public long Id { get; set; }
		public string ShiftName { get; set; }
		public TimeSpan ShiftStartTime { get; set; }
		public TimeSpan ShiftEndTime { get; set; }
	}
}

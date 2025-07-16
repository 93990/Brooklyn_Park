namespace Brooklyn.Dtos
{
	public class DowntimeLogDto
	{
		public long DowntimeId { get; set; }
		public long ModelId { get; set; }
		public DateTime StartTime { get; set; }
		public DateTime EndTime { get; set; }
		public TimeSpan TotalDowntime { get; set; }
		public string Name { get; set; }
		public string TypeName { get; set; }
		public string ReasonText { get; set; }
		public string Username { get; set; }
	}
}


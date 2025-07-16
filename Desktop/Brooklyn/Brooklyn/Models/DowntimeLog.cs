namespace Brooklyn.Models
{
	public class DowntimeLog
	{
		public long DowntimeId { get; set; }

		public long ModelId { get; set; }
	//	public string Model { get; set; }

		public DateTime StartTime { get; set; }
		public DateTime EndTime { get; set; }

		public long DowntimeTypeId { get; set; }
		//public string DowntimeType { get; set; }

		public long DowntimeReasonId { get; set; }

		public TimeSpan TotalDowntime { get; set; }
	
		public string Details { get; set; }
		public long UserId { get; set; }
	//	public User User { get; set; }
	}
}

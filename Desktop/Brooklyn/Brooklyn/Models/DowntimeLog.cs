namespace Brooklyn.Models
{
	public class DowntimeLog
	{
		public long DowntimeLogId { get; set; }

		public long ModelId { get; set; }
	//	public Model Model { get; set; }

		public DateTime StartTime { get; set; }
		public DateTime EndTime { get; set; }

	//	public long DowntimeTypeId { get; set; }
		public string DowntimeType { get; set; }

	//	public long DowntimeReasonId { get; set; }
		public string DowntimeReason { get; set; }

	//	public string Details { get; set; }

		public long UserId { get; set; }
		public User User { get; set; }
	}
}

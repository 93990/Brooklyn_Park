namespace Brooklyn.Dtos
{
	public class DowntimeLogDto
	{
		public int ModelId { get; set; }
		public DateTime StartTime { get; set; }
		public DateTime EndTime { get; set; }
		public int DowntimeTypeId { get; set; }
		public int DowntimeReasonId { get; set; }
		public string Details { get; set; }
		public int UserId { get; set; }
	}
}

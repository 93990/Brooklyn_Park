namespace Brooklyn.Dtos
{
	public class QualityLogDto
	{
		public int ModelId { get; set; }
		public string PartNumber { get; set; }
		public DateTime StartTime { get; set; }
		public DateTime EndTime { get; set; }
		public string QualityStatus { get; set; }
		public string? Reason { get; set; }
		public int UserId { get; set; }
	}
}

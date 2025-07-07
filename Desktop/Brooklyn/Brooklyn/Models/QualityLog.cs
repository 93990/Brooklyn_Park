namespace Brooklyn.Models
{
	public class QualityLog
	{
		public long? QualityLogId { get; set; }

		public long? ModelId { get; set; }
		public Model? Model { get; set; }

		public string? PartNumber { get; set; }

		public DateTime? StartTime { get; set; }
		public DateTime? EndTime { get; set; }

		public string? QualityStatus { get; set; } // Pass / Fail

		public string? Reason { get; set; }

		public long? UserId { get; set; }
		public User? User { get; set; }
	}
}

namespace Brooklyn.Models
{
	public class DowntimeReason
	{
		public long DowntimeReasonId { get; set; }

		public long DowntimeTypeId { get; set; }
		public DowntimeType DowntimeType { get; set; }

		public string ReasonText { get; set; }
	}
}

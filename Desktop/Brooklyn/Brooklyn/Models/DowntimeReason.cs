namespace Brooklyn.Models
{
	public class DowntimeReason
	{
		public long ReasonId { get; set; }

		public string ReasonText { get; set; }

		public long DowntimeTypeID { get; set; }

		public DowntimeType DowntimeType { get; set; }
	}
}

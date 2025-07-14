namespace Brooklyn.Dtos
{
	public class DowntimeDto
	{
	//	public long DowntimeReasonId { get; set; }
		public string Reason { get; set; } = string.Empty;
		public long DowntimeTypeId { get; set; }
		public string DowntimeType { get; set; }
	}
}
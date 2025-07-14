namespace Brooklyn.Dtos
{
	public class DowntimeReasonDto
	{
		public long Id { get; set; }

		public long DowntimeTypeID { get; set; }

		//public string DowntimeType { get; set; }

		public string ReasonText { get; set;  }
	}
}

using Microsoft.EntityFrameworkCore;

namespace Brooklyn.Dtos
{
	[Keyless]
	public class DowntimeLogView
	{
		public long DowntimeId { get; set; }
		public long ModelId { get; set; }
		public DateTime StartTime { get; set; }
		public DateTime EndTime { get; set; }
		public TimeSpan TotalDowntime { get; set; }
		public string Name { get; set; }         // Model name
		public string TypeName { get; set; }     // Downtime Type
		public string ReasonText { get; set; }   // Downtime Reason
		public string Username { get; set; }     // Entered by
	}
}

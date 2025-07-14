using System.ComponentModel.DataAnnotations;

namespace Brooklyn.Models
{
	public class DowntimeType
	{
		//[Key]
		public long DowntimeTypeId { get; set; }

		
		public string DownTimeType { get; set; }

		public ICollection<DowntimeReason> Reason { get; set; } 

	}
}

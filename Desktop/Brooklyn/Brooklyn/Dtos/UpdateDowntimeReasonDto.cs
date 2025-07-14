using System.ComponentModel.DataAnnotations;

namespace Brooklyn.Dtos
{
	public class UpdateDowntimeReasonDto
	{
		[Required]
		public string Reason { get; set; } = string.Empty;

		[Required]
		public long DowntimeTypeId{ get; set; }
	}
}
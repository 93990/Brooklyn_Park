using System.ComponentModel.DataAnnotations;

namespace Brooklyn.Dtos
{
	public class CreateDowntimeReasonDto
	{
		[Required]
		public long DowntimeTypeId { get; set; }

		[Required]
		public string Reason { get; set; }
	}
}
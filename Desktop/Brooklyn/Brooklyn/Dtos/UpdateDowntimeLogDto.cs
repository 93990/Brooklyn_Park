using System.ComponentModel.DataAnnotations;

namespace Brooklyn.Dtos
{
	public class UpdateDowntimeLogDto
	{
		[Required] public long DowntimeId { get; set; }

		[Required] public long ModelId { get; set; }              // Must exist
		[Required] public long DowntimeTypeId { get; set; }       // Must exist
		[Required] public long DowntimeReasonId { get; set; }     // Must exist

		public string? Details { get; set; }
	}
}

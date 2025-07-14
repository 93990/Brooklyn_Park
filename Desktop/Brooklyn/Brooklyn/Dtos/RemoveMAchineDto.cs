using System.ComponentModel.DataAnnotations;

namespace Brooklyn.Dtos
{
	public class RemoveMAchineDto
	{
		[Required]
		public long ModelId { get; set; }

		[Required]
		public string WorkArea { get; set; }

		[Required]
		public string Station { get; set; }
	}
}

using System.ComponentModel.DataAnnotations;

namespace Brooklyn.Dtos
{
	public class UpdateMAchineDto
	{
		

		[Required]
		public string WorkArea { get; set; }

		[Required]
		public string Station { get; set; }

		[Required]
		public string Model { get; set; }
	}
}

using System.ComponentModel.DataAnnotations;

namespace Brooklyn.Dtos
{
	public class CreateShiftDto
	{
		[Required]
		public string ShiftName { get; set; }

		[Required]

		
		public string ShiftStartTime { get; set; }

		[Required]

	
		public string ShiftEndTime { get; set; }
	}
}

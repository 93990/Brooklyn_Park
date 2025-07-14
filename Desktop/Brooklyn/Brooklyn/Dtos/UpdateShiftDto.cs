using System.ComponentModel.DataAnnotations;

namespace Brooklyn.Dtos
{
	public class UpdateShiftDto
	{
		[Required]
		public string ShiftName { get; set; }

		[Required]

		//[DataType(DataType.Time)]
		public string ShiftStartTime { get; set; }

		[Required]

		//[DataType(DataType.Time)]
		public string ShiftEndTime { get; set; }
	}
}

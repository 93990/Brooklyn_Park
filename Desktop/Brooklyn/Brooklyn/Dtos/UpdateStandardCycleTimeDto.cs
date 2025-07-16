using System.ComponentModel.DataAnnotations;

namespace Brooklyn.Dtos
{
	public class UpdateStandardCycleTimeDto
	{
		[Required]
		public int ModelId { get; set; }

		[Required]
		public string ModelName { get; set; } = string.Empty;

		[Required]
		[Range(1, int.MaxValue, ErrorMessage = "Cycle time must be greater than 0")]
		public int CycleTimeMinutes { get; set; }
	}
}

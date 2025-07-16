namespace Brooklyn.Dtos
{
	public class StandardCycleTimeDto
	{
		public int Id { get; set; }
		public int ModelId { get; set; }
		public string ModelName { get; set; } = string.Empty;
		public int CycleTimeMinutes { get; set; }
	}
}

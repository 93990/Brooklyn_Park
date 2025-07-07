namespace Brooklyn.Models
{
	public class StandardCycleTime
	{
		public long StandardCycleTimeId { get; set; }

		public long? ModelId { get; set; }
		public Model? Model { get; set; }

		public int? CycleTimeMinutes { get; set; }
	}
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Brooklyn.Models
{
	public class MachineInformation
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public long MachineId { get; set; }

		public long? WorkAreaId { get; set; }
		public WorkArea WorkArea { get; set; }

		public long? StationId { get; set; }
		public Station? Station { get; set; }

		public long? ModelId { get; set; }
		public Model? Model { get; set; }
	}
}



using Brooklyn.Models;
using Microsoft.EntityFrameworkCore;

namespace BrooklynPark.Api.Data
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

		public DbSet<User> Users { get; set; }
		public DbSet<WorkArea> WorkAreas { get; set; }
		public DbSet<Station> Stations { get; set; }
		public DbSet<Model> Models { get; set; }
		public DbSet<MachineInformation> MachineInformation { get; set; }
		public DbSet<DowntimeType> DowntimeTypes { get; set; }
		public DbSet<DowntimeReason> DowntimeReasons { get; set; }
		public DbSet<DowntimeLog> DowntimeLogs { get; set; }
		public DbSet<QualityLog> QualityLogs { get; set; }
		public DbSet<Shift> Shifts { get; set; }
		public DbSet<StandardCycleTime> StandardCycleTimes { get; set; }

		protected override void OnModelCreating(ModelBuilder modelbuilder)
		{
			base.OnModelCreating(modelbuilder);

			modelbuilder.Entity<MachineInformation>().HasKey(mi => mi.MachineId);
		}
	}
}
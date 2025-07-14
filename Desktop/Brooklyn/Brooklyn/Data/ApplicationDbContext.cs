

using Brooklyn.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection.PortableExecutable;

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

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<DowntimeType>().Property(dt => dt.DownTimeType)
				.IsRequired();
			modelBuilder.Entity<DowntimeReason>().HasKey(dr => dr.ReasonId);

			modelBuilder.Entity<DowntimeReason>()
				.HasOne(dr => dr.DowntimeType)
				.WithMany(dt => dt.Reason)
				.HasForeignKey(dr => dr.DowntimeTypeID).OnDelete(DeleteBehavior.Cascade);




			// 🔹 Downtime FK
			

			// 🔹 Machine FK setup
			modelBuilder.Entity<MachineInformation>()
				.HasOne(m => m.WorkArea)
				.WithMany()
				.HasForeignKey(m => m.WorkAreaId);

			modelBuilder.Entity<MachineInformation>()
				.HasOne(m => m.Station)
				.WithMany()
				.HasForeignKey(m => m.StationId);

			modelBuilder.Entity<MachineInformation>()
				.HasOne(m => m.Model)
				.WithMany()
				.HasForeignKey(m => m.ModelId);

			// 🔹 AppUser
			modelBuilder.Entity<User>()
				.Property(u => u.Username)
				.IsRequired();

			modelBuilder.Entity<User>()
				.Property(u => u.Role)
				.IsRequired();
		}
	}
}
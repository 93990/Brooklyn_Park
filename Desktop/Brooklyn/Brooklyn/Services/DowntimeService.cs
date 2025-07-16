using Brooklyn.Dtos;
using Brooklyn.Models;
using Microsoft.EntityFrameworkCore;
using BrooklynPark.Api.Data;
using Nest;

namespace Brooklyn.Services
{
	public class DowntimeService : IDowntimeService
	{
		private readonly ApplicationDbContext _context;

		public DowntimeService(ApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<List<DowntimeReasonDto>> GetAllDowntimeTypesAsync()
		{
			return await _context.DowntimeReasons.Include(r => r.DowntimeType)
			.Select(d => new DowntimeReasonDto
			{
				DowntimeTypeID = d.DowntimeTypeID,
				//DowntimeType = d.DowntimeType.DownTimeType,
				ReasonText = d.ReasonText,
				Id = d.ReasonId
			}).ToListAsync();
		}


		public async Task<DowntimeReasonDto> GetDowntimeReasonsByDowntimeTypeIdAsync(long id)
		{
			var item = await _context.DowntimeReasons
.FirstOrDefaultAsync(r => r.ReasonId == id);

			if (item == null) return null;

			return new DowntimeReasonDto
			{
				Id = item.ReasonId,
				DowntimeTypeID = item.DowntimeTypeID,
				ReasonText = item.ReasonText
			};
		}

		public async Task<DowntimeReasonDto> AddDowntimeReasonAsync(CreateDowntimeReasonDto dto)
		{
			var isValidType = await _context.DowntimeTypes.AnyAsync(dt => dt.DowntimeTypeId == dto.DowntimeTypeId);
			if (!isValidType)
				throw new ArgumentException($"Invalid DowntimeTypeId: {dto.DowntimeTypeId}");

			// Check for duplicate DowntimeTypeID and ReasonText
			bool exists = await _context.DowntimeReasons.AnyAsync(r => r.DowntimeTypeID == dto.DowntimeTypeId && r.ReasonText == dto.Reason);
			if (exists)
				throw new InvalidOperationException("A downtime reason with the same DowntimeTypeId and Reason already exists.");

			var reason = new DowntimeReason
			{
				DowntimeTypeID = dto.DowntimeTypeId,
				ReasonText = dto.Reason
			};

			_context.DowntimeReasons.Add(reason);
			await _context.SaveChangesAsync();

			return new DowntimeReasonDto
			{
				Id = reason.ReasonId,
				DowntimeTypeID = reason.DowntimeTypeID,
				ReasonText = reason.ReasonText
			};
		}

		public async Task<DowntimeReasonDto> UpdateDowntimeReasonAsync(long id, UpdateDowntimeReasonDto dto)
		{
			var entity = await _context.DowntimeReasons.FindAsync(id);
			if (entity == null) return null;

			// Check for duplicate DowntimeTypeID and ReasonText (excluding current record)
			bool exists = await _context.DowntimeReasons.AnyAsync(r => r.DowntimeTypeID == dto.DowntimeTypeId && r.ReasonText == dto.Reason && r.ReasonId != id);
			if (exists)
				throw new InvalidOperationException("A downtime reason with the same DowntimeTypeId and Reason already exists.");

			// Validate the DowntimeTypeId
			var isValidType = await _context.DowntimeTypes.AnyAsync(dt => dt.DowntimeTypeId == dto.DowntimeTypeId);
			if (!isValidType)
				throw new ArgumentException($"Invalid DowntimeTypeId: {dto.DowntimeTypeId}");

			entity.DowntimeTypeID = dto.DowntimeTypeId;
			entity.ReasonText = dto.Reason;

			await _context.SaveChangesAsync();

			return new DowntimeReasonDto
			{
				Id = entity.ReasonId,
				DowntimeTypeID = entity.DowntimeTypeID,
				ReasonText = entity.ReasonText
			};
		}

		public async Task<bool> DeleteDowntimeReasonAsync(long id)
		{
			var item = await _context.DowntimeReasons.FindAsync(id);
			if (item == null) return false;

			_context.DowntimeReasons.Remove(item);
			await _context.SaveChangesAsync();
			return true;
		}
	

public async Task<List<DowntimeLogDto>> GetAllAsync()
		{
			return await _context.DowntimeLogViews
				.Select(v => new DowntimeLogDto
				{
					DowntimeId = v.DowntimeId,
					ModelId = v.ModelId,
					StartTime = v.StartTime,
					EndTime = v.EndTime,
					TotalDowntime = v.TotalDowntime,
					Name = v.Name,
					TypeName = v.TypeName,
					ReasonText = v.ReasonText,
					Username = v.Username
				})
				.ToListAsync();
		}


		public async Task<bool> UpdateAsync(UpdateDowntimeLogDto dto)
		{
			var log = await _context.DowntimeLogs.FindAsync(dto.DowntimeId);
			if (log == null)
				return false;

			// Validate foreign keys
			var modelExists = await _context.Models.AnyAsync(m => m.ModelId == dto.ModelId);
			var typeExists = await _context.DowntimeTypes.AnyAsync(t => t.DowntimeTypeId == dto.DowntimeTypeId);
			var reasonExists = await _context.DowntimeReasons.AnyAsync(r => r.ReasonId == dto.DowntimeReasonId);

			if (!modelExists || !typeExists || !reasonExists)
				throw new Exception("Invalid ModelId, DowntimeTypeId, or DowntimeReasonId.");

			// Only update allowed fields
			log.ModelId = dto.ModelId;
			log.DowntimeTypeId = dto.DowntimeTypeId;
			log.DowntimeReasonId = dto.DowntimeReasonId;
			log.Details = dto.Details;

			await _context.SaveChangesAsync();
			return true;
		}
	}
}
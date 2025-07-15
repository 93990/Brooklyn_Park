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
				ReasonText= d.ReasonText,
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
	}
}
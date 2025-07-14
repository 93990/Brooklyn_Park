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
			var item = await _context.DowntimeReasons.Include(r => r.DowntimeType).FirstOrDefaultAsync(r => r.ReasonId == id);
			return item == null ? null : new DowntimeReasonDto
			{
				Id = item.ReasonId,
				//DowntimeType = item.DowntimeType.DownTimeType,
				DowntimeTypeID = item.DowntimeTypeID,
				ReasonText = item.ReasonText
			};
		}

		public async Task<DowntimeReasonDto> AddDowntimeReasonAsync(CreateDowntimeReasonDto dto)
		{
			var entity = new DowntimeReason
			{
				DowntimeTypeID = dto.DowntimeTypeId,
				ReasonText = dto.Reason
			};

			_context.DowntimeReasons.Add(entity);
			await _context.SaveChangesAsync();

			return await GetDowntimeReasonsByDowntimeTypeIdAsync(entity.ReasonId) ?? throw new Exception("Creation failed.");
		}

		public async Task<DowntimeReasonDto> UpdateDowntimeReasonAsync(long id, UpdateDowntimeReasonDto dto)
		{
			var entity = await _context.DowntimeReasons.FindAsync(id);
			if (entity == null) return null;

			//entity.DownTypeID = dto.DowntimeTypeId;
			entity.ReasonText = dto.Reason;

			await _context.SaveChangesAsync();
			return await GetDowntimeReasonsByDowntimeTypeIdAsync(id);
		}

		public async Task<bool> DeleteDowntimeReasonAsync(long id)
		{
			var item = await _context.DowntimeTypes.FindAsync(id);
			if (item == null) return false;

			_context.DowntimeTypes.Remove(item);
			await _context.SaveChangesAsync();
			return true;
		}
	}
}
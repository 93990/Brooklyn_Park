using Brooklyn.Dtos;
using Brooklyn.Models;
using Microsoft.EntityFrameworkCore;
using BrooklynPark.Api.Data;

namespace Brooklyn.Services
{
	public class StandardCycleTimeService : IStandardCycleTimeService
	{
		private readonly ApplicationDbContext _context;

		public StandardCycleTimeService(ApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<List<StandardCycleTimeDto>> GetAllStandardLifeCycleTime()
		{
			return await _context.StandardCycleTimes.Include(s => s.Model)
				.Select(s => new StandardCycleTimeDto
				{
					Id = s.StandardCycleTimeId,
					ModelId = (int)s.ModelId,
					ModelName = s.Model.Name ?? string.Empty,
					CycleTimeMinutes = (int)s.CycleTimeMinutes
				}).ToListAsync();
		}

		public async Task<StandardCycleTimeDto> GetStandardLifeCycleTimeById(int id)
		{
			var item = await _context.StandardCycleTimes
				.FirstOrDefaultAsync(s => s.StandardCycleTimeId == id);

			if (item == null) return null;

			return new StandardCycleTimeDto
			{
				Id = item.StandardCycleTimeId,
				ModelId = (int)item.ModelId,
				CycleTimeMinutes = (int)item.CycleTimeMinutes
			};
		}

		public async Task<StandardCycleTimeDto> AddStandardLifecycleTIme(CreateStandardCycleTimeDto dto)
		{
			var isValidModel = await _context.Models.AnyAsync(m => m.ModelId == dto.ModelId);
			if (!isValidModel)
				throw new ArgumentException($"Invalid ModelId: {dto.ModelId}");

			var standardCycleTime = new StandardCycleTime
			{
				ModelId = dto.ModelId,
				CycleTimeMinutes = dto.CycleTimeMinutes
			};

			_context.StandardCycleTimes.Add(standardCycleTime);
			await _context.SaveChangesAsync();

			return new StandardCycleTimeDto
			{
				Id = standardCycleTime.StandardCycleTimeId,
				ModelId = (int)standardCycleTime.ModelId,
				CycleTimeMinutes = (int)standardCycleTime.CycleTimeMinutes
			};
		}

		public async Task<StandardCycleTimeDto> UpdateStandardLifecycleTime(int id, UpdateStandardCycleTimeDto dto)
		{
			var entity = await _context.StandardCycleTimes.FindAsync(id);
			if (entity == null) return null;

			// Validate the ModelId
			var isValidModel = await _context.Models.AnyAsync(m => m.ModelId == dto.ModelId);
			if (!isValidModel)
				throw new ArgumentException($"Invalid ModelId: {dto.ModelId}");

			entity.ModelId = dto.ModelId;
			entity.CycleTimeMinutes = dto.CycleTimeMinutes;

			await _context.SaveChangesAsync();

			return new StandardCycleTimeDto
			{
				//Id = entity.Id,
				ModelId = (int)entity.ModelId,
				CycleTimeMinutes = (int)entity.CycleTimeMinutes
			};
		}

		public async Task<bool> DeleteStandardLifecycleTime(int id)
		{
			var item = await _context.StandardCycleTimes.FindAsync(id);
			if (item == null) return false;

			_context.StandardCycleTimes.Remove(item);
			await _context.SaveChangesAsync();
			return true;
		}
	}
}

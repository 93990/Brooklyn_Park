using Brooklyn.Dtos;
using Brooklyn.Models;
using BrooklynPark.Api.Data;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace Brooklyn.Services
{
	public class ShiftService : IShiftService
	{
		private readonly ApplicationDbContext _context;

		public ShiftService(ApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<List<ShiftDto>> GetAllAsync()
		{
			return await _context.Shifts
				.Select(s => new ShiftDto
				{
					Id = s.ShiftId,
					ShiftName = s.ShiftName,
					ShiftStartTime = s.StartTime,
					ShiftEndTime = s.EndTime
				}).ToListAsync();
		}

		public async Task<ShiftDto?> GetByIdAsync(long id)
		{
			var shift = await _context.Shifts.FindAsync(id);
			if (shift == null) return null;

			return new ShiftDto
			{
				Id = shift.ShiftId,
				ShiftName = shift.ShiftName,
				ShiftStartTime = shift.StartTime,
				ShiftEndTime = shift.EndTime
			};
		}

		public async Task<ShiftDto> CreateAsync(CreateShiftDto dto)
		{
			var start = DateTime.ParseExact(dto.ShiftStartTime, "hh:mm tt",
				CultureInfo.InvariantCulture).TimeOfDay;
			var end = DateTime.ParseExact(dto.ShiftEndTime, "hh:mm tt",
				CultureInfo.InvariantCulture).TimeOfDay;

			// Check for duplicate Shift
			bool exists = await _context.Shifts.AnyAsync(s => s.ShiftName == dto.ShiftName && s.StartTime == start && s.EndTime == end);
			if (exists)
				throw new InvalidOperationException("A shift with the same name, start time, and end time already exists.");

			var shift = new Shift
			{
				ShiftName = dto.ShiftName,
				StartTime = start,
				EndTime = end
			};

			_context.Shifts.Add(shift);
			await _context.SaveChangesAsync();

			return await GetByIdAsync(shift.ShiftId) ?? throw new Exception("Creation failed");
		}

		public async Task<ShiftDto?> UpdateAsync(long id, UpdateShiftDto dto)
		{
			var shift = await _context.Shifts.FindAsync(id);
			if (shift == null) return null;
			var start = DateTime.ParseExact(dto.ShiftStartTime, "hh:mm tt",
				CultureInfo.InvariantCulture).TimeOfDay;
			var end = DateTime.ParseExact(dto.ShiftEndTime, "hh:mm tt",
				CultureInfo.InvariantCulture).TimeOfDay;

			// Check for duplicate Shift (excluding current record)
			bool exists = await _context.Shifts.AnyAsync(s => s.ShiftName == dto.ShiftName && s.StartTime == start && s.EndTime == end && s.ShiftId != id);
			if (exists)
				throw new InvalidOperationException("A shift with the same name, start time, and end time already exists.");

			shift.ShiftName = dto.ShiftName;
			shift.StartTime = start;
			shift.EndTime = end;

			await _context.SaveChangesAsync();
			return await GetByIdAsync(id);
		}

		public async Task<bool> DeleteAsync(long id)
		{
			var shift = await _context.Shifts.FindAsync(id);
			if (shift == null) return false;

			_context.Shifts.Remove(shift);
			await _context.SaveChangesAsync();
			return true;
		}
	}
}


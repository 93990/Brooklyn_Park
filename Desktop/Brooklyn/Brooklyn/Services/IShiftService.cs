using Brooklyn.Dtos;

namespace Brooklyn.Services
{
	public interface IShiftService
	{
		Task<List<ShiftDto>> GetAllAsync();
		Task<ShiftDto?> GetByIdAsync(long id);
		Task<ShiftDto> CreateAsync(CreateShiftDto dto);
		Task<ShiftDto?> UpdateAsync(long id, UpdateShiftDto dto);
		Task<bool> DeleteAsync(long id);
	}
}

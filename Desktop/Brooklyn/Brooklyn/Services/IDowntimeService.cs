using Brooklyn.Models;
using Brooklyn.Dtos;
namespace Brooklyn.Services
{
	public interface IDowntimeService
	{
		Task<List<DowntimeReasonDto>> GetAllDowntimeTypesAsync();
		//Task<DowntimeReasonDto?> GetAllDowntimeReasonAsync(long id);
		Task<DowntimeReasonDto> GetDowntimeReasonsByDowntimeTypeIdAsync(long downtimeTypeId);
		Task<DowntimeReasonDto> AddDowntimeReasonAsync(CreateDowntimeReasonDto createDto);
		Task<DowntimeReasonDto> UpdateDowntimeReasonAsync(long id, UpdateDowntimeReasonDto updateDto);
		Task<bool> DeleteDowntimeReasonAsync(long id);
	}
}
using Brooklyn.Dtos;

namespace Brooklyn.Services
{
	public interface IStandardCycleTimeService
	{
		Task<List<StandardCycleTimeDto>> GetAllStandardLifeCycleTime();
		Task<StandardCycleTimeDto> GetStandardLifeCycleTimeById(int id);
		Task<StandardCycleTimeDto> AddStandardLifecycleTIme(CreateStandardCycleTimeDto dto);
		Task<StandardCycleTimeDto> UpdateStandardLifecycleTime(int id, UpdateStandardCycleTimeDto dto);
		Task<bool> DeleteStandardLifecycleTime(int id);
	}
}

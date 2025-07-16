using Brooklyn.Dtos;
using Brooklyn.Services;
using Microsoft.AspNetCore.Mvc;

namespace Brooklyn.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class StandardCycleTimeController : ControllerBase
	{
		private readonly IStandardCycleTimeService _standardCycleTimeService;

		public StandardCycleTimeController(IStandardCycleTimeService standardCycleTimeService)
		{
			_standardCycleTimeService = standardCycleTimeService;
		}

		[HttpGet]
		public async Task<ActionResult<List<StandardCycleTimeDto>>> GetAllStandardLifeCycleTime()
		{
			return Ok(await _standardCycleTimeService.GetAllStandardLifeCycleTime());
		}

		[HttpGet("{id}")]
		public async Task<StandardCycleTimeDto> GetStandardLifeCycleTimeById(int id)
		{
			var result = await _standardCycleTimeService.GetStandardLifeCycleTimeById(id);

			return result;
		}

		[HttpPost]
		public async Task<StandardCycleTimeDto> AddStandardLifecycleTIme([FromBody] CreateStandardCycleTimeDto createDto)
		{
			try
			{
				var result = await _standardCycleTimeService.AddStandardLifecycleTIme(createDto);
				return result;
			}
			catch (Exception ex)
			{
				throw new Exception($"Failed to create standard cycle time: {ex.Message}");
			}
		}

		[HttpPut("{id}")]
		public async Task<StandardCycleTimeDto> UpdateStandardLifecycleTime(int id, [FromBody] UpdateStandardCycleTimeDto updateDto)
		{
			try
			{
				var result = await _standardCycleTimeService.UpdateStandardLifecycleTime(id, updateDto);
				return result;
			}
			catch (Exception ex)
			{
				throw new Exception($"Failed to update standard cycle time with ID {id}: {ex.Message}");
			}
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteStandardLifecycleTime(int id)
		{
			var deleted = await _standardCycleTimeService.DeleteStandardLifecycleTime(id);
			if (!deleted)
				return NotFound($"No standard cycle time found with ID {id}");
			return Ok("Standard cycle time deleted successfully.");
		}
	}
}
using Brooklyn.Dtos;
using Brooklyn.Services;
using Microsoft.AspNetCore.Mvc;
using Nest;
using System.Net;

namespace Brooklyn.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class DowntimeController : ControllerBase
	{
		private readonly IDowntimeService _downtimeService;

		public DowntimeController(IDowntimeService downtimeService)
		{
			_downtimeService = downtimeService;
		}

	//	[HttpGet]
		
		
			[HttpGet("types")]
			public async Task<ActionResult<List<DowntimeReasonDto>>> GetAllDowntimeTypes()
			{
				return Ok(await _downtimeService.GetAllDowntimeTypesAsync());
			}
		


		//Task<DowntimeDto> GetDowntimeReasonsByDowntimeTypeIdAsync(long downtimeTypeId);
		[HttpGet("{id}")]
		public async Task<DowntimeReasonDto> GetDowntimeReasonsByDowntimeTypeId(long id)
		{
			var result = await _downtimeService.GetDowntimeReasonsByDowntimeTypeIdAsync(id);
			
			return result;
		}
		//Task<DowntimeDto> AddDowntimeReasonAsync(CreateDowntimeDto createDto);
		[HttpPost]
		//[HttpPost("reasons")]
		public async Task<DowntimeReasonDto> AddDowntimeReason([FromBody] CreateDowntimeReasonDto createDto)
		{
			try
			{
				var result = await _downtimeService.AddDowntimeReasonAsync(createDto);
				return result;
			}
			catch (Exception ex)
			{
				throw new Exception($"Failed to create downtime reason: {ex.Message}");
			}
		}
		//Task<DowntimeDto> UpdateDowntimeReasonAsync(long id, UpdateDowntimeReasonDto updateDto);

		[HttpPut("types")]
		public async Task<DowntimeReasonDto> UpdateDowntimeReason(long id, [FromBody] UpdateDowntimeReasonDto updateDto)
		{
			try
			{
				var result = await _downtimeService.UpdateDowntimeReasonAsync(id, updateDto);
				return result;
			}
			catch (Exception ex)
			{
				throw new Exception($"Failed to update downtime reason with ID {id}: {ex.Message}");
			}
		}
		//Task<bool> DeleteDowntimeReasonAsync(long id);
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteDowntimeReason(long id)
		{
			var deleted = await _downtimeService.DeleteDowntimeReasonAsync(id);
			if(!deleted)
				return NotFound($"No Downtime reason found with ID {id}");
			return Ok("Downtime reason deleted successfully.");
		}

		[HttpGet("operator")]
		public async Task<List<DowntimeLogDto>> GetAllOperatorValue()
		{
			var result = await _downtimeService.GetAllAsync();
			return result;
		}

		[HttpPut("operator")]
		public async Task<bool> UpdateDowntimeLog([FromBody] UpdateDowntimeLogDto dto)
		{
			//try
			//{
				var updated = await _downtimeService.UpdateAsync(dto);
				return updated;
			//}
			//catch (Exception ex)
			//{
			//	return BadRequest(ex.Message);
			//}
		}
	}
}
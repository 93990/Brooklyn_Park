using Brooklyn.Dtos;
using Brooklyn.Services;
using Microsoft.AspNetCore.Mvc;

namespace Brooklyn.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ShiftController : ControllerBase
	{
		private readonly IShiftService _service;

		public ShiftController(IShiftService service)
		{
			_service = service;
		}

		//  Get all shifts
		[HttpGet]
		public async Task<ActionResult<List<ShiftDto>>> GetAllAsync()
		{
			var result = await _service.GetAllAsync();
			return Ok(result);
		}

		//  Get shift by ID
		[HttpGet("{id}")]
		public async Task<ActionResult<ShiftDto>> GetByIdAsync(long id)
		{
			var result = await _service.GetByIdAsync(id);
			if (result == null)
				return NotFound($"No shift found with ID {id}");
			return Ok(result);
		}

		//  Create new shift
		[HttpPost]
		public async Task<ActionResult<ShiftDto>> CreateAsync([FromBody] CreateShiftDto dto)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			var created = await _service.CreateAsync(dto);
			return Ok(created);
			//return CreatedAtAction(nameof(GetByIdAsync), new { id = created.Id }, created);
		}

		// ✅ Update shift by ID
		[HttpPut("{id}")]
		public async Task<ActionResult<ShiftDto>> UpdateAsync(long id, [FromBody] UpdateShiftDto dto)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			var updated = await _service.UpdateAsync(id, dto);
			if (updated == null)
				return NotFound($"No shift found with ID {id}");
			return Ok(updated);
		}

		// ✅ Delete shift by ID
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteAsync(long id)
		{
			var deleted = await _service.DeleteAsync(id);
			if (!deleted)
				return NotFound($"No shift found with ID {id}");
			return Ok("Shift deleted successfully.");
		}
	}
}

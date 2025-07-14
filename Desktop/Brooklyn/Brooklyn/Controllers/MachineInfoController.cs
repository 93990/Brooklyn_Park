using Brooklyn.Dtos;
using Brooklyn.Services;
using BrooklynPark.Api.Data;
using Microsoft.AspNetCore.Mvc;

namespace Brooklyn.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class MachineInfoController : ControllerBase
	{
		//private readonly ApplicationDbContext _context;
		private readonly IMachineService _machineService;
		public MachineInfoController(IMachineService service)
		{
			_machineService = service;
		}

		[HttpGet]
		public async Task<List<MachineInfodto>> GetAllMachineInfo()
		{

			return await _machineService.GetAllMachineInfo();

		}



		[HttpGet("{id}")]
		public async Task<ActionResult<MachineInfodto>> GetByIdMachine(long id)
		{
			var result = await _machineService.GetByIdAsync(id);
			if (result == null)
				return NotFound();
			return Ok(result);
		}

		[HttpPost]
		public async Task<ActionResult<MachineInfodto>> CreateMachine([FromBody] CreateMachineDto dto)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			var newId = await _machineService.CreateMachine(dto);
			return CreatedAtAction(nameof(GetByIdMachine), new { id = newId }, newId);
		}


		[HttpPut("{id}")]
		public async Task<ActionResult<MachineInfodto>> UpdateMachine(long id, [FromBody] UpdateMAchineDto dto)
		{
			

			var updatedMachine = await _machineService.UpdateMachineAsync(id ,dto);

			if (updatedMachine == null)
				return NotFound($"Machine with ID {id} not found.");

			return Ok(updatedMachine);
		}

		[HttpDelete]
		public async Task<IActionResult> RemoveMachine([FromBody] RemoveMAchineDto dto)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			var removed = await _machineService.RemoveMachineAsync(dto);

			if (!removed)
				return NotFound("No machine matched the provided criteria.");

			return Ok("Machine removed successfully.");
		}
	}
}


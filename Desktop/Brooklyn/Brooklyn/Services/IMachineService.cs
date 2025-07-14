using Brooklyn.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Brooklyn.Services
{
	public interface IMachineService   
	{
		 Task<List<MachineInfodto>> GetAllMachineInfo();

		Task<ActionResult<MachineInfodto>> GetByIdAsync(long id);

		//Task<ActionResult<long>> CreateMachine([FromBody] CreateMachineDtoS machineinfo);
		Task<ActionResult<MachineInfodto>> CreateMachine([FromBody] CreateMachineDto dto);

		Task<MachineInfodto?> UpdateMachineAsync(long machineId , UpdateMAchineDto dto);
		Task<bool> RemoveMachineAsync(RemoveMAchineDto dto);
	}
}

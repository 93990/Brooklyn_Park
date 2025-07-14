using Brooklyn.Dtos;
using Brooklyn.Models;
using BrooklynPark.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nest;

namespace Brooklyn.Services
{
	public class MachineInfoService : IMachineService
	{

		private readonly ApplicationDbContext _service;
		//private readonly IRepository<Models.MachineInformation > _machineInformationrepo;
		public MachineInfoService(ApplicationDbContext service)
		{
			_service = service;
		}

		
		public async Task<MachineInfodto?> GetMachineByIdAsync(long id)
		{
			var machine = await _service.MachineInformation
				.Include(m => m.WorkArea)
				.Include(m => m.Station)
				.Include(m => m.Model)
				.FirstOrDefaultAsync(m => m.MachineId == id);

			if (machine == null)
				return null;

			return new MachineInfodto
			{
				Id = machine.MachineId,
				WorkArea = machine.WorkArea.Name,
				Station = machine.Station.Name,
				Model = machine.Model.Name
			
			};
		}
		public async Task<List<MachineInfodto>> GetAllMachineInfo()
		{
			return await _service.MachineInformation
				.Where(m => !string.IsNullOrWhiteSpace(m.WorkArea.Name))
			.OrderBy(m => m.WorkArea)
				.ThenBy(m => m.Station)
				.Select(m => new MachineInfodto
				{
					Id = m.MachineId,
					WorkArea = m.WorkArea.Name,
					Station = m.Station.Name,
					Model = m.Model.Name
				})
				.ToListAsync();
		}

		public async Task<ActionResult<MachineInfodto>> GetByIdAsync(long id)
		{
			return await _service.MachineInformation.Where(m => m.MachineId == id).Select(m => new
			MachineInfodto
			{
				Id = m.MachineId,
				WorkArea = m.WorkArea.Name,
				Station = m.Station.Name,
				Model = m.Model.Name

			}).FirstOrDefaultAsync();
		}

		public async Task<ActionResult<MachineInfodto>> CreateMachine([FromBody] CreateMachineDto dto)
		{
			var workArea = await _service.WorkAreas.FirstOrDefaultAsync(w => w.Name == dto.WorkArea);
			if (workArea == null)
			{
				workArea = new WorkArea { Name = dto.WorkArea };
				_service.WorkAreas.Add(workArea);
				await _service.SaveChangesAsync();
			}

			// Find or create Station
			var station = await _service.Stations.FirstOrDefaultAsync(s => s.Name == dto.Station);
			if (station == null)
			{
				station = new Station { Name = dto.Station };
				_service.Stations.Add(station);
				await _service.SaveChangesAsync();
			}

			// Find or create Model
			var model = await _service.Models.FirstOrDefaultAsync(m => m.Name == dto.Model);
			if (model == null)
			{
				model = new Model { Name = dto.Model };
				_service.Models.Add(model);
				await _service.SaveChangesAsync();
			}

			// Create machine info
			var machine = new MachineInformation
			{
				WorkAreaId = workArea.WorkAreaId,
				StationId = station.StationId,
				ModelId = model.ModelId
			};

			_service.MachineInformation.Add(machine);
			await _service.SaveChangesAsync();

			return new MachineInfodto
			{
				Id = machine.MachineId,
				WorkArea = workArea.Name,
				Station = station.Name,
				Model = model.Name

			};
		}



		public async Task<MachineInfodto?> UpdateMachineAsync(long machineId , UpdateMAchineDto dto)
		{
			var machine = await _service.MachineInformation
				.FirstOrDefaultAsync(m => m.MachineId == machineId);

			if (machine == null)
				return null;

			// Find or create WorkArea
			var workArea = await _service.WorkAreas.FirstOrDefaultAsync(w => w.Name == dto.WorkArea);
			if (workArea == null)
			{
				workArea = new WorkArea { Name = dto.WorkArea };
				_service.WorkAreas.Add(workArea);
				await _service.SaveChangesAsync();
			}

			// Find or create Station
			var station = await _service.Stations.FirstOrDefaultAsync(s => s.Name == dto.Station);
			if (station == null)
			{
				station = new Station { Name = dto.Station };
				_service.Stations.Add(station);
				await _service.SaveChangesAsync();
			}

			// Find or create Model
			var model = await _service.Models.FirstOrDefaultAsync(m => m.Name == dto.Model);
			if (model == null)
			{
				model = new Model { Name = dto.Model };
				_service.Models.Add(model);
				await _service.SaveChangesAsync();
			}

			// Update the machine entity
			machine.WorkAreaId = workArea.WorkAreaId;
			machine.StationId = station.StationId;
			machine.ModelId = model.ModelId;
			

			await _service.SaveChangesAsync();

			return new MachineInfodto
			{
				Id = machine.MachineId,
				WorkArea = workArea.Name,
				Station = station.Name,
				Model = model.Name

			};
		}
		public async Task<bool> RemoveMachineAsync(RemoveMAchineDto dto)
		{
			var machine = await _service.MachineInformation
				.Include(m => m.WorkArea)
				.Include(m => m.Station)
				.Where(m =>
					m.ModelId == dto.ModelId &&
		m.WorkArea.Name == dto.WorkArea &&
		m.Station.Name == dto.Station)
				.FirstOrDefaultAsync();

			if (machine == null)
				return false;

			_service.MachineInformation.Remove(machine);
			await _service.SaveChangesAsync();
			return true;
		}
	}
	}

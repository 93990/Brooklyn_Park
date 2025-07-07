using Brooklyn.Models;
using BrooklynPark.Api.Data;
using Microsoft.AspNetCore.Mvc;

namespace BrooklynPark.Api.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class UserController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public UserController(ApplicationDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		public IActionResult GetUsers()
		{
			var users = _context.Users.ToList();
			return Ok(users);
		}

		[HttpPost]
		public IActionResult CreateUser(User user)
		{
			_context.Users.Add(user);
			_context.SaveChanges();
			return Ok(user);
		}
	}
}

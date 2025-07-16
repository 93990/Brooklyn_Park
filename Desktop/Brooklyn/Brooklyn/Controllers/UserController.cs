using Brooklyn.Dtos;
using Brooklyn.Models;
using Brooklyn.Services;
using BrooklynPark.Api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BrooklynPark.Api.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class UserController : ControllerBase
	{
		private readonly ApplicationDbContext _context;
		private readonly JwtTokenService _jWTTokenService;

		public UserController(ApplicationDbContext context, JwtTokenService jWTTokenService)
		{
			_context = context;
			_jWTTokenService = jWTTokenService;
			
		}
		[HttpPost("login")]
		public IActionResult Login([FromBody] Login request)
		{
			var user = _context.Users
				.FirstOrDefault(u => u.Username == request.Username && u.PasswordHash == request.PasswordHash);

			if (user == null)
				return Unauthorized("Invalid credentials.");

			var token = _jWTTokenService.GenerateToken(user.UserId, user.Username);
			return Ok(new { token });
		}



		[Authorize]

		[HttpGet("me")]
		public IActionResult GetUsers()
		{
			var userId = User.FindFirst("UserId")?.Value;
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

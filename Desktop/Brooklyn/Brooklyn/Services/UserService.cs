using Brooklyn.Models;
using BrooklynPark.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Brooklyn.Services
{

	public class UserService : IUserService
	{
		private readonly ApplicationDbContext _context;

		public UserService(ApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<List<User>> GetAllUsersAsync() =>
			await _context.Users.ToListAsync();

		public async Task<User?> GetUserByIdAsync(int id) =>
			await _context.Users.FindAsync(id);

		public async Task<User> CreateUserAsync(User user)
		{
			_context.Users.Add(user);
			await _context.SaveChangesAsync();
			return user;
		}
	}
}


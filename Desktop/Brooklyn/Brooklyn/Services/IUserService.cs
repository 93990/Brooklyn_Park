using Brooklyn.Models;

namespace Brooklyn.Services
{
	public interface IUserService
	{
		Task<List<User>>GetAllUsersAsync();
		Task<User?> GetUserByIdAsync(int id);

		Task<User> CreateUserAsync(User user);
	}
}

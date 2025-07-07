using System.ComponentModel.DataAnnotations;

namespace Brooklyn.Models
{
	public class User
	{
		[Key]
		public long UserId { get; set; }
		public string Username { get; set; }
		public string PasswordHash { get; set; }
		public string Role { get; set; }

	}
}

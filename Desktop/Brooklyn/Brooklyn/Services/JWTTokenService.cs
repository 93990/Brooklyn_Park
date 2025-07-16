using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Brooklyn.Models;
using Brooklyn.JWT;

namespace Brooklyn.Services
{
	public class JwtTokenService
	{
		private readonly JwtSetting _settings;

		public JwtTokenService(IOptions<JwtSetting> options)
		{
			_settings = options.Value;
		}

		public string GenerateToken(long userId, string username)
		{
			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Key));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var claims = new[]
			{
				new Claim("UserId", userId.ToString()),
				new Claim(ClaimTypes.Name, username),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
			};

			var token = new JwtSecurityToken(
				issuer: _settings.Issuer,
				audience: _settings.Audience,
				claims: claims,
				expires: DateTime.UtcNow.AddMinutes(_settings.ExpiresInMinutes),
				signingCredentials: creds
			);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}
	}
}

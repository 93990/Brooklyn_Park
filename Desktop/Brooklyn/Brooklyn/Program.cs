using Brooklyn.JWT;
using Brooklyn.Services;
using BrooklynPark.Api.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString
	("DefaultConnection"), sqlOptions => sqlOptions.EnableRetryOnFailure()));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(
//	c =>
//{
//	c.MapType<TimeSpan>(() => new Microsoft.OpenApi.Models.OpenApiSchema
//	{
//		Type = "string",
//		Format = "time",
//		Example = new OpenApiString("07:30:00")
//	});
//}
);
builder.Services.Configure<JwtSetting>(
	builder.Configuration.GetSection("JwtSettings"));

var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSetting>();
var key = Encoding.ASCII.GetBytes(jwtSettings.Key);

builder.Services.AddAuthentication(options =>
{
	options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
	options.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuer = true,
		ValidateAudience = true,
		ValidateIssuerSigningKey = true,
		ValidIssuer = jwtSettings.Issuer,
		ValidAudience = jwtSettings.Audience,
		IssuerSigningKey = new SymmetricSecurityKey(key)
	};
});

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IMachineService, MachineInfoService>();
builder.Services.AddScoped<IShiftService, ShiftService>();
builder.Services.AddScoped<IDowntimeService, DowntimeService>();
builder.Services.AddScoped<IStandardCycleTimeService, StandardCycleTimeService>();
builder.Services.AddScoped<JwtTokenService>();
builder.Services.AddSwaggerGen(c =>
{
	c.SwaggerDoc("v1", new() { Title = "Brooklyn API", Version = "v1" });

	// 👇 Add JWT support
	c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
	{
		Name = "Authorization",
		Type = SecuritySchemeType.ApiKey,
		Scheme = "Bearer",
		BearerFormat = "JWT",
		In = ParameterLocation.Header,
		Description = "Enter 'Bearer <token>'"
	});

	c.AddSecurityRequirement(new OpenApiSecurityRequirement
	{
		{
			new OpenApiSecurityScheme
			{
				Reference = new OpenApiReference
				{
					Type = ReferenceType.SecurityScheme,
					Id = "Bearer"
				}
			},
			Array.Empty<string>()
		}
	});
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();



app.MapControllers();

app.Run();

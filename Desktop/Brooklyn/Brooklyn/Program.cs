using Brooklyn.Services;
using BrooklynPark.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;

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
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IMachineService, MachineInfoService>();
builder.Services.AddScoped<IShiftService, ShiftService>();
builder.Services.AddScoped<IDowntimeService, DowntimeService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

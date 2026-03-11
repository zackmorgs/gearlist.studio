using System.ComponentModel.DataAnnotations;

namespace Gearlist.Api.Models.Dto;

public record LoginRequest(
    [property: Required, EmailAddress] string Email,
    [property: Required] string Password);
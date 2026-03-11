using System.ComponentModel.DataAnnotations;

namespace Models.Dto;

public record RegisterRequest(
    [property: Required, StringLength(80, MinimumLength = 2)] string DisplayName,
    [property: Required, EmailAddress] string Email,
    [property: Required, StringLength(100, MinimumLength = 8)] string Password);

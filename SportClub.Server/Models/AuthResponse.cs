namespace SportClub.Server.Models
{
    public class AuthResponse
    {
        public string Token { get; set; }
        public string Message { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}

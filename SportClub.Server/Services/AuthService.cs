using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace SportClub.Server.Services
{
    public class AuthService
    {
        public string GenerateSalt(int size = 16)
        {
            var saltBytes = new byte[size];
            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(saltBytes);
            }
            return Convert.ToBase64String(saltBytes);
        }
        public string HashPassword(string password, string salt)
        {
            var saltBytes = Convert.FromBase64String(salt);
            var hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: saltBytes,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 32
            ));
            return hashedPassword;
        }

        public string GenerateSessionToken()
        {
            return Convert.ToBase64String(Guid.NewGuid().ToByteArray()) + DateTime.UtcNow.ToString("yyyyMMddHHmmss");
        }

        public bool VerifyPassword(string enteredPassword, string storedHash, string storedSalt)
        {
            var hashOfEnteredPassword = HashPassword(enteredPassword, storedSalt);
            return storedHash == hashOfEnteredPassword;
        }
    }
}

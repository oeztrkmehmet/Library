using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Core.BaseCore
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class BaseController : ControllerBase
    {
        public string UserId
        {
            get
            {
                try
                {
                    return User.Claims.Single(claim => claim.Type == ClaimTypes.NameIdentifier).Value;
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }
        public string NullableUserId
        {
            get
            {
                try
                {
                    return User.Claims.Single(claim => claim.Type == ClaimTypes.NameIdentifier).Value;
                }
                catch (Exception)
                {
                    return null;
                }
            }
        }

        public string RoleName
        {
            get
            {
                try
                {
                    return User.Claims.Single(claim => claim.Type == ClaimTypes.Role).Value;
                }
                catch (Exception)
                {
                    return null;
                }
            }
        }
        public string IP => HttpContext.Request.Headers.Keys.Any(x => x == "X-Forwarded-For") ?
                                HttpContext.Request.Headers["X-Forwarded-For"][0] :
                            HttpContext.Request.Headers.Keys.Any(x => x == "client_ip") ?
                                HttpContext.Request.Headers["client_ip"][0] :
                            HttpContext.Request.Headers.Keys.Any(x => x == "ClientRemoteIP") ?
                                HttpContext.Request.Headers["ClientRemoteIP"][0] : "";
        public string UserAgent => HttpContext.Request.Headers.Keys.Any(x => x == "User-Agent") ? HttpContext.Request.Headers["User-Agent"].ToString() : null;
    }
}

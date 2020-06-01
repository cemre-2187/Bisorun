using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bisorun5.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string UserName { get; set; }       
        public string UserPassword { get; set; }
        public string UserRole { get; set; }
        public string UserMail { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string UserImage { get; set; }
        public string UserRank { get; set; }
        public bool UserSex { get; set; }        
        public DateTime UserBorn { get; set; }
        public string UserLocation { get; set; }
     
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bisorun5.Models
{
    public class Question
    {
        [Key]
        public int QuestionId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string UserName { get; set; }     
        public string Image { get; set; }
        public string Date { get; set; }
        public bool IsLikeQ { get; set; }
        public int CategoryId { get; set; }   
      
    }
}

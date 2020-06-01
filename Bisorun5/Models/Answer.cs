using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bisorun5.Models
{
    public class Answer
    {
        [Key]
        public int AnswerId { get; set; }

        public string AnswerBody { get; set; }

        public string AnswerDate { get; set; }
        
        public string UserName { get; set; }

        public string UserMail { get; set; }
        public bool IsLikeAn { get; set; }
        public int QuestionId { get; set; }
      
        
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Base
{
    public class BaseEntity
    {
        public Guid ID { get; set; } = Guid.NewGuid();
        public DateTime? CreateDate { get; set; } = DateTime.Now;
        public DateTime? UpdateDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public bool IsActive { get; set; } = true;

    }
}

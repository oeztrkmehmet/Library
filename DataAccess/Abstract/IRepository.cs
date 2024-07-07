using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract
{
    public interface IRepository<T>
    {
        T GetById(Guid id);
        List<T> GetAll(Expression<Func<T, bool>> filter = null);
        bool Create(T entity);
        bool Update(T entity);
        bool Delete(T entity);
    }
}

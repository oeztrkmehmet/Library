using DataAccess.Abstract;
using Database.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete
{
    public class EfCoreGenericRepository<T, TContext> : IRepository<T>
    where T : class
    where TContext : DbContext
    {
        private TContext _context;
        public EfCoreGenericRepository(TContext context)
        {
            _context = context;
        }
        public bool Create(T entity)
        {
            bool resp = false;
            _context.Set<T>().Add(entity);
            if (_context.SaveChanges() > 0)
            {
                resp = true;
            };
            return resp;
        }

        public bool Delete(T entity)
        {
            bool resp = false;
            _context.Set<T>().Remove(entity);
            if (_context.SaveChanges() > 0)
            {
                resp = true;
            };
            return resp;
        }

        public List<T> GetAll(Expression<Func<T, bool>> filter = null)
        {
            return filter == null ? _context.Set<T>().ToList() : _context.Set<T>().Where(filter).ToList();
        }

        public T GetById(Guid id)
        {
            return _context.Set<T>().Find(id);
        }

        public bool Update(T entity)
        {
            bool resp = false;
            _context.Set<T>().Update(entity);
            if (_context.SaveChanges() > 0)
            {
                resp = true;
            };
            return resp;
        }
    }
}

using E_Commerce.Models;

namespace E_Commerce.Data.Repositories
{
    public interface IProductRepository
    {
        // Get all products
        Task<IEnumerable<Product>> GetAllAsync();

        // Get product by id
        Task<Product?> GetByIdAsync(int id);

        // Add new product
        Task AddAsync(Product product);

        Task UpdateAsync(Product product);

        // Delete product
        Task DeleteAsync(int id);

        // Save changes to database
        Task SaveAsync();
    }
}

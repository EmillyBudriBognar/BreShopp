const ProductCard = ({ product }) => {
  const handleNavigate = (productId) => {
    // Navega para a página de detalhes do produto
    window.location.href = `/products/${productId}`
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition h-full flex flex-col">
      <div className="relative flex-1">
        <div className="block h-full" onClick={() => handleNavigate(product.id)}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-64 object-cover"
            onError={(e) => {
              // e.target.src = '.jpg'
            }}
          />
        </div>
        {product.tag && (
          <span className="absolute top-2 right-2 bg-custom-pink text-white text-xs px-2 py-1 rounded">
            {product.tag}
          </span>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow-0">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-custom-green">
            <span 
              onClick={() => handleNavigate(product.id)}
              className="hover:underline line-clamp-2 cursor-pointer"
              title={product.name}
            >
              {product.name}
            </span>
          </h3>
          <span className="font-bold text-custom-green whitespace-nowrap ml-2">
            R$ {product.price}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 truncate" title={product.brecho}>
          {product.brecho}
        </p>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xs bg-custom-cream text-custom-green px-2 py-1 rounded">
            {product.condition}
          </span>
          <button 
            className="text-custom-pink hover:text-custom-green transition"
            aria-label="Adicionar aos favoritos"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
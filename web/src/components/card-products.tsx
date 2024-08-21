import { useQueryClient } from '@tanstack/react-query'
import { Edit, X } from 'lucide-react'
import { deleteProduct } from '../http/delete-product'

interface CardProductsProps {
  id: string
  title: string
  description: string
  price: string
  handleEditProduct: () => void
}

export function CardProducts({
  id,
  title,
  description,
  price,
  handleEditProduct,
}: CardProductsProps) {
  const queryClient = useQueryClient()

  async function handleDeleteProduct() {
    try {
      await deleteProduct({ productId: id })
      queryClient.invalidateQueries({ queryKey: ['products'] })
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  return (
    <div className="bg-zinc-50 max-w-80 text-zinc-900 flex flex-col items-center justify-between p-2 gap-2 rounded-lg">
      <div className="flex flex-col px-2 text-center items-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-zinc-800 text-md break-words leading-relaxed">
          {description}
        </p>
      </div>

      <img
        src="https://images.unsplash.com/photo-1716541424893-734612ddcabb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Camisetas"
        className="w-60 h-40 rounded-lg object-cover"
      />

      <span className="text-3xl font-semibold text-zinc-900 mt-auto">
        R${Number(price).toFixed(2)}
      </span>

      <div className="flex flex-col gap-2 w-full">
        <button
          onClick={handleEditProduct}
          className="flex items-center w-full text-sm justify-center bg-zinc-800 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-950 transition-all py-2 rounded-lg"
        >
          <Edit className="size-6 mr-2" />
          Editar produto
        </button>

        <button
          onClick={handleDeleteProduct}
          className="flex items-center w-full text-sm justify-center bg-zinc-800 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-950 transition-all py-2 rounded-lg"
        >
          <X className="size-6 mr-2" />
          Deletar produto
        </button>
      </div>
    </div>
  )
}

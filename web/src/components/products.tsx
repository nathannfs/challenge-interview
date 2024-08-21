import { useQuery } from '@tanstack/react-query'
import { CirclePlus } from 'lucide-react'
import { useState } from 'react'
import { getProducts } from '../http/get-products'
import { CardProducts } from './card-products'
import { CreateProductForm } from './create-product-form'
import { UpdateProductForm } from './update-product-form'

// Interface para o novo produto

export function Products() {
  const [modal, setModal] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [editProduct, setEditProduct] = useState<string>()

  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  return (
    <div className="bg-zinc-800 w-full flex flex-col items-center justify-center gap-4 py-6">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-4xl font-semibold">Produtos</h2>

        <button
          onClick={() => setModal(true)}
          className="flex items-center text-lg justify-center bg-zinc-900 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-950 transition-all px-2 py-1.5 rounded-lg"
        >
          <CirclePlus className="size-6 mr-2" />
          Adicionar produto
        </button>
      </div>

      <div className="bg-zinc-950 w-80 h-px"></div>

      <div className="max-w-7xl flex items-center justify-center gap-4 flex-wrap">
        {data?.products?.length ? (
          data.products.map((product) => (
            <CardProducts
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              handleEditProduct={() => {
                setModalEdit(true)
                setEditProduct(() => {
                  return product.id
                })
              }}
            />
          ))
        ) : (
          <div className="flex flex-col gap-2 text-2xl text-zinc-400">
            <p>Não há produtos disponíveis!</p>
          </div>
        )}

        {modal && <CreateProductForm closeModal={() => setModal(false)} />}

        {modalEdit && (
          <UpdateProductForm
            closeModal={() => setModalEdit(false)}
            productId={editProduct!}
          />
        )}
      </div>
    </div>
  )
}

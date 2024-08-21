import { useQueryClient } from '@tanstack/react-query'
import { useState, type FormEvent } from 'react'

import { Edit, X } from 'lucide-react'
import { updateProduct } from '../http/update-project'
import { convertFirstLetter } from '../utils/convert-first-letter'
import { convertPrice } from '../utils/convert-price'

interface ModalProps {
  closeModal: () => void
  productId: string
}

export function UpdateProductForm({ closeModal, productId }: ModalProps) {
  const queryClient = useQueryClient()

  const [title, setTitle] = useState<string | undefined>(undefined)
  const [description, setDescription] = useState<string | undefined>(undefined)
  const [price, setPrice] = useState<string | undefined>()

  async function handleUpdateProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title && !description && !price) {
      alert('Preencha pelo menos um campo!')
      return false
    }

    try {
      await updateProduct({
        productId,
        title: title ? convertFirstLetter(title) : undefined,
        description: description ? convertFirstLetter(description) : undefined,
        price: convertPrice(price),
      })

      queryClient.invalidateQueries({ queryKey: ['products'] })
      closeModal()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Editar produto</h2>
            <button type="button" onClick={closeModal}>
              <X className="size-6 text-zinc-400" />
            </button>
          </div>
        </div>

        <form
          onSubmit={handleUpdateProduct}
          className="flex flex-col gap-2 mt-4 space-y-4"
        >
          <div className="flex flex-col items-start justify-center gap-4">
            <label htmlFor="title" className="mx-2 font-bold">
              Título produto
            </label>

            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Digite o título do produto"
              autoComplete="off"
              className="flex-1 bg-transparent mx-2 outline-none w-full text-zinc-100 placeholder:text-zinc-500"
            />
          </div>

          <div className="bg-zinc-950 w-full h-px"></div>

          <div className="flex flex-col items-start justify-center gap-4">
            <label htmlFor="title" className="mx-2 font-bold">
              Descrição produto
            </label>

            <input
              type="text"
              name="title"
              id="title"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Digite a descrição do produto"
              autoComplete="off"
              className="flex-1 bg-transparent mx-2 outline-none w-full text-zinc-100 placeholder:text-zinc-500"
            />
          </div>

          <div className="bg-zinc-950 w-full h-px"></div>

          <div className="flex flex-col items-start justify-center gap-4">
            <label htmlFor="title" className="mx-2 font-bold">
              Preço produto
            </label>

            <input
              type="text"
              name="title"
              id="title"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="Digite o preço do produto"
              autoComplete="off"
              className="flex-1 bg-transparent mx-2 outline-none w-full text-zinc-100 placeholder:text-zinc-500"
            />
          </div>

          <button
            type="submit"
            className="flex items-center text-lg justify-center bg-zinc-900 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-950 transition-all py-4 rounded-lg"
          >
            <Edit className="size-6 mr-2" />
            Salvar produto
          </button>
        </form>
      </div>
    </div>
  )
}

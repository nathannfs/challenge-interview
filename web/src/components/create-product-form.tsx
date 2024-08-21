import { useQueryClient } from '@tanstack/react-query'
import { useState, type FormEvent } from 'react'
import { createProduct } from '../http/create-product'

import { CirclePlus, X } from 'lucide-react'
import { convertFirstLetter } from '../utils/convert-first-letter'

interface ModalProps {
  closeModal: () => void
}

export function CreateProductForm({ closeModal }: ModalProps) {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<string>('')

  async function handleCreateProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title || !description || !price) {
      alert('Preencha todos os campos!')
      return false
    }

    try {
      await createProduct({
        title: convertFirstLetter(title),
        description: convertFirstLetter(description),
        price: price.split(',').join('.').slice(0),
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
            <h2 className="text-lg font-semibold">Criar novo produto</h2>
            <button type="button" onClick={closeModal}>
              <X className="size-6 text-zinc-400" />
            </button>
          </div>
        </div>

        <form
          onSubmit={handleCreateProduct}
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
              onChange={(event) => setPrice(String(event.target.value))}
              placeholder="Digite o preço do produto"
              autoComplete="off"
              className="flex-1 bg-transparent mx-2 outline-none w-full text-zinc-100 placeholder:text-zinc-500"
            />
          </div>

          <button
            type="submit"
            className="flex items-center text-lg justify-center bg-zinc-900 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-950 transition-all py-4 rounded-lg"
          >
            <CirclePlus className="size-5 mr-2" />
            Adicionar produto
          </button>
        </form>
      </div>
    </div>
  )
}

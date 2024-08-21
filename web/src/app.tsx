import { Header } from './components/header'
import { Products } from './components/products'

export function App() {
  return (
    <div className="bg-zinc-950 text-zinc-50 min-h-screen w-full grid grid-rows-[auto_1fr] antialiased">
      <Header />

      <main className="flex flex-1 overflow-y-scroll">
        <Products />
      </main>
    </div>
  )
}

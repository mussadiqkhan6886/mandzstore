import CollectionCard from '@/components/MainComp/CollectionCard'
import { collectionsPage } from '@/lib/constants'
import { cormorant } from '@/lib/fonts'

const page = () => {
    
  return (
    <main className='max-w-7xl mx-auto'>
      <h1 className={`${cormorant.className} text-4xl uppercase text-center my-12`}>Catalog</h1>
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mb-10'>
      {collectionsPage.map((item, i) => (
        <CollectionCard key={i} {...item} />
      ))}
      </section>
    </main>
  )
}

export default page

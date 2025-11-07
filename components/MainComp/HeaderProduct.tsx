import React from 'react'

const HeaderProduct = ({title, desc}: {title: string, desc: string}) => {
  return (
    <section>
      <h2>{title}</h2>
      <p>{desc}</p>
    </section>
  )
}

export default HeaderProduct

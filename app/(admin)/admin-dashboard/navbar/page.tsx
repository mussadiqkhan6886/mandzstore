import React from 'react'

// export const sidebarData = [
//   { title: "Home", link: "/", delay: 0.1 },

//   {
//     title: "Dupatta",
//     delay: 0.2,
//     children: [
//       { title: "Chiffon Dupatta", link: "/collections/chiffon-dupatta" },
//       { title: "Lawn Cutwork Dupatta", link: "/collections/lawn-cutwork-dupatta" },
//       { title: "Jackard Dupatta", link: "/collections/jackard-dupatta" },
//       { title: "Organza Dupatta", link: "/collections/organza-dupatta" },
//       { title: "Silk Dupatta", link: "/collections/silk-dupatta" },
//       { title: "Four Sided Border Dupatta", link: "/collections/four-sided-border-dupatta" },
//       { title: "Fancy Dupatta", link: "/collections/fancy-dupatta" },
//       { title: "View All", link: "/collections/dupatta" },
//     ],
//   },

//   {
//     title: "Hijab",
//     delay: 0.3,
//     children: [
//       { title: "Silk Hijab", link: "/collections/silk-hijab" },
//       { title: "Lawn Hijab", link: "/collections/lawn-hijab" },
//       { title: "Georgette Hijab", link: "/collections/georgette-hijab" },
//       { title: "View All", link: "/collections/hijab" },
//     ],
//   },

//   { title: "Chaddar", link: "/collections/chaddar", delay: 0.4 },
// ];

const page = () => {
  return (
    <main>
      <h1>NavBar</h1>
      {/* will display navigation, update, delete, add children to  existing title and read (CRUD) */}
      <section>

      </section>
      {/* will add new title and if their children */}
      <section>
        <form>
            <input type="text" placeholder="title.." />
            <input type="text" placeholder="title link.." />
            <label htmlFor="children">Children
                <input type="checkbox" id="children" />
            </label>
            <input type="text" placeholder='children title' />
            <input type="text" placeholder='children link' />
            <button>Add another Children</button>
        </form>
      </section>
    </main>
  )
}

export default page

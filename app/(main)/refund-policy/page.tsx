import { cormorant } from '@/lib/fonts'
import React from 'react'

const page = () => {
  return (
    <main className='pt-40 max-w-2xl mx-auto px-6'>
      <div>
        <h1 className={`${cormorant.className} text-5xl text-center uppercase mb-3`}>Refund policy</h1>
        <p className='my-6 text-sm'>
            We have a 7-day return policy, which means you have 7 days after receiving your item to request a return.
            <br />
            <br />
            <br />
        To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.
<br />
<br />
        Refund will only be given if the item sent is defective or the item sent is different from the one ordered.
<br />
<br />
        For all other issues such as change of mind, etc. refund will not be given and only an exchange will be given. Please note, no refund will be given in case there is a difference in price between the exchanged items. Furthermore, the customer will need to send the items to our office address and pay the delivery charges incurred during the exchange of the items. We will inspect the items and then courier the exchanged items.
<br />
<br />

        Items on sale cannot be refunded or exchanged. Only defective sale items will be eligible for exchange. 
<br />

        To start a return, you can contact us at info@kefpk.com. Items sent back to us without first requesting a return will not be accepted.
<br />
<br />

        You can always contact us for any return questions at info@kefpk.com.
<br />
<br />
<br />
        <span className='font-semibold block'>Damages and issues</span>
        Please inspect your order upon reception and contact us immediately if the item is defective, or damaged or if you receive the wrong item so that we can evaluate the issue and make it right.

<br />
<br />
        <span className='font-semibold block'>Exceptions / non-returnable items</span>
        Certain types of items cannot be returned, like perishable goods (such as food, flowers, or plants), custom products (such as special orders or personalized items), and personal care goods (such as beauty products). We also do not accept returns for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item.
<br />
<br />

        Unfortunately, we cannot accept returns on sale items or gift cards.
<br />
<br />


        <span className='font-semibold block'>Exchanges</span>
        The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.

<br />
<br />

        <span className='font-semibold block'>Refunds</span>
        We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund too.
        </p>
      </div>
    </main>
  )
}

export default page

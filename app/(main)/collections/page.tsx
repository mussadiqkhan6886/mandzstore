import type { Metadata } from 'next';
import { redirect } from 'next/navigation';


export const generateMetadata = (): Metadata => { return {
  title: "M&Z Store | Collections",
  description: "M&Z Store different type of collections which include different variates such as silk hijab, lawn hijab, chaddar, dupatta and more. Discover them and have your dream hijab, Chaddar or Dupatta now."
} };

const page = () => {
    
  return redirect('/')
}

export default page

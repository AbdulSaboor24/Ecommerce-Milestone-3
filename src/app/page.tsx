import { sanityClient } from '../lib/sanity';
import Hero from './components/Hero';

export interface Category {
  name: string;
  slug: { current: string };
}

export interface Product {
  name: string;
  slug: { current: string };
  image: { asset: { url: string } };
  price: number;
}

export default async function Home() {
  const featuredProductsQuery = `*[_type == "product" && isFeatured == true]{
    name,
    slug,
    image {
      asset -> { url }
    },
    price
  }`;

  const categoriesQuery = `*[_type == "category"]{
    name,
    slug
  }`;

  // Fetch data using Sanity client
  const featuredProducts: Product[] = await sanityClient.fetch(featuredProductsQuery);
  const categories: Category[] = await sanityClient.fetch(categoriesQuery);

  return <Hero categories={categories} featuredProducts={featuredProducts} />;
}
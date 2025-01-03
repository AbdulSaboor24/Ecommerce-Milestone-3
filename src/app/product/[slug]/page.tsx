import { sanityClient } from '../../../lib/sanity';

export interface Product {
  name: string;
  slug: { current: string };
  image: { asset: { url: string } };
  price: number;
  description: string;
  category: { name: string; slug: { current: string } };
}

interface ProductPageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;

  const productQuery = `*[_type == "product" && slug.current == $slug][0]{
    name,
    slug,
    image {
      asset -> { url }
    },
    price,
    description,
    category -> { name, slug }
  }`;

  const product: Product = await sanityClient.fetch(productQuery, { slug });

  if (!product) {
    return <h1 className="text-center text-2xl mt-10">Product Not Found</h1>;
  }

  return (
    <div>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">My eCommerce</h1>
          <a href="/" className="hover:underline">
            Home
          </a>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div>
            <img
              src={product.image.asset.url}
              alt={product.name}
              className="w-full h-auto rounded"
            />
          </div>
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">${product.price}</p>
            <p className="text-gray-800 mb-6">{product.description}</p>
            <a
              href={`/category/${product.category.slug.current}`}
              className="text-blue-500 hover:underline"
            >
              View more in {product.category.name}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
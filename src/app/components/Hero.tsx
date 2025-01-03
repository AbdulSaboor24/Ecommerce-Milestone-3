import Link from 'next/link';
import Image from 'next/image';

interface Category {
  name: string;
  slug: { current: string };
}

interface Product {
  name: string;
  slug: { current: string };
  image: { asset: { url: string } };
  price: number;
}

interface HeroProps {
  categories: Category[];
  featuredProducts: Product[];
}

const Hero = ({ categories, featuredProducts }: HeroProps) => {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">My eCommerce</h1>
          <ul className="flex space-x-6">
            {categories.map((category) => (
              <li key={category.slug.current}>
                <Link href={`/category/${category.slug.current}`}>
                  <span className="cursor-pointer hover:underline text-lg">{category.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto py-10">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProducts.map((product) => (
            <Link href={`/product/${product.slug.current}`} key={product.slug.current}>
              <div className="group border rounded-lg shadow-xl overflow-hidden bg-white transform transition-transform hover:scale-105 cursor-pointer">
                <div className="relative w-full h-64">
                  <Image
                    src={product.image.asset.url}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:opacity-90 transition-opacity"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xl font-semibold text-gray-700 mt-2">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Hero;
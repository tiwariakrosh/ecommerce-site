import { getProductById } from "@/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import AddToCartButton from "@/components/add-to-cart-button";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id).catch(() => null);
  return {
    title: product ? `${product.title} - FakeStore` : "Product Not Found",
    description: product?.description?.slice(0, 160),
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  let product;

  try {
    product = await getProductById(id);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-16">
        <div className="relative aspect-square bg-gray-100 rounded-3xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-12"
          />
        </div>
        <div>
          <div className="uppercase text-xs tracking-[2px] text-gray-500 mb-3">
            {product.category}
          </div>
          <h1 className="text-4xl font-semibold leading-tight mb-4">
            {product.title}
          </h1>

          <div className="flex items-center gap-3 mb-8">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${i < Math.floor(product.rating.rate) ? "fill-current" : ""}`}
                />
              ))}
            </div>
            <span className="text-xl font-medium">${product.price}</span>
            <span className="text-sm text-gray-500">
              ({product.rating.count} reviews)
            </span>
          </div>

          <div className="prose text-gray-600 mb-10">{product.description}</div>

          <AddToCartButton product={product} />

          {/* JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                name: product.title,
                image: product.image,
                description: product.description,
                sku: product.id,
                offers: {
                  "@type": "Offer",
                  priceCurrency: "USD",
                  price: product.price,
                  availability: "https://schema.org/InStock",
                },
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
}

// import { getProductById } from "@/lib/api";
// import Image from "next/image";
// import { notFound } from "next/navigation";
// import { Star } from "lucide-react";
// import AddToCartButton from "@/components/add-to-cart-button";

// interface Props {
//   params: { id: string };
// }

// export async function generateMetadata({ params }: Props) {
//   const product = await getProductById(params.id).catch(() => null);

//   return {
//     title: product ? `${product.title} - BlueStore` : "Product Not Found",
//     description: product?.description?.slice(0, 160),
//   };
// }

// export default async function ProductPage({ params }: Props) {
//   let product;

//   try {
//     product = await getProductById(params.id);
//   } catch {
//     notFound();
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-16">
//       <div className="grid md:grid-cols-2 gap-16">
//         {/* Image Section */}
//         <div className="relative aspect-square bg-blue-50 border border-blue-100 rounded-3xl overflow-hidden shadow-sm">
//           <Image
//             src={product.image}
//             alt={product.title}
//             fill
//             className="object-contain p-14"
//           />
//         </div>

//         {/* Details Section */}
//         <div>
//           <div className="uppercase text-xs tracking-[3px] text-blue-600 font-semibold mb-3">
//             {product.category}
//           </div>

//           <h1 className="text-4xl font-bold text-gray-900 mb-5 leading-tight">
//             {product.title}
//           </h1>

//           {/* Rating + Price */}
//           <div className="flex flex-wrap items-center gap-4 mb-8">
//             {/* Stars */}
//             <div className="flex text-amber-400">
//               {Array.from({ length: 5 }).map((_, i) => (
//                 <Star
//                   key={i}
//                   className={`w-6 h-6 ${
//                     i < Math.floor(product.rating.rate) ? "fill-current" : ""
//                   }`}
//                 />
//               ))}
//             </div>

//             {/* Price */}
//             <span className="text-3xl font-bold text-blue-600">
//               ${product.price}
//             </span>

//             <span className="text-sm text-gray-500">
//               ({product.rating.count} reviews)
//             </span>
//           </div>

//           {/* Description Card */}
//           <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-10 shadow-sm">
//             <p className="text-gray-700 leading-relaxed">
//               {product.description}
//             </p>
//           </div>

//           {/* Add To Cart Button */}
//           <AddToCartButton product={product} />

//           {/* Structured Data */}
//           <script
//             type="application/ld+json"
//             dangerouslySetInnerHTML={{
//               __html: JSON.stringify({
//                 "@context": "https://schema.org",
//                 "@type": "Product",
//                 name: product.title,
//                 image: product.image,
//                 description: product.description,
//                 sku: product.id,
//                 offers: {
//                   "@type": "Offer",
//                   priceCurrency: "USD",
//                   price: product.price,
//                   availability: "https://schema.org/InStock",
//                 },
//               }),
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

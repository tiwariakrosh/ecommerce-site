import Image from "next/image";
import ecommerceImg from "../../public/Ecommerce web page-pana (1).svg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 font-sans">
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Ecommerce Store
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Your one-stop shop for all your products.
        </p>

        <Image
          src={ecommerceImg}
          alt="Storefront"
          width={400}
          height={300}
          className="mx-auto rounded-2xl shadow-md"
        />

        <Link
          href="/products"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full mt-10 transition shadow-md"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}

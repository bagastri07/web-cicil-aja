import { Button } from "@chakra-ui/react";
import Image from "next/image";
import Navbar from "../components/navbar";
import Seo from "../components/seo";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Seo page="Home" />
      <div className="bg-gradient-to-br from-blue-50 to-blue-400 w-full">
        <Navbar />
        <main className="flex justify-center px-14 mt-10">
          <div className="flex w-full max-w-6xl">
            <div className="w-1/2 -mt-10">
              <h2 className="text-6xl leading-tight font-bold mt-20">
                Mencicil Tidak pernah Terasa Semudah Ini
              </h2>
              <p className="mt-5 w-2/3">
                Cicilan terbaik dan juga termudah untuk mahasiswa dari
                universitas ataupun tempat manapun.
              </p>
              <Button
                onClick={() => router.push("/register")}
                colorScheme="purple"
                size="lg"
                mt="6"
              >
                Coba Sekarang
              </Button>
              <div>
                <hr className="border-black my-8" />
                <h3 className="text-2xl font-semibold">Testimonial</h3>
                <div className="bg-white rounded-2xl p-6 max-w-md mt-10">
                  <svg
                    className="-mt-10"
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="22" cy="22" r="22" fill="black" />
                    <path
                      d="M29.1702 14.2559L28.8533 16.7119C28.0787 16.6591 27.4801 16.7999 27.0575 17.1344C26.635 17.4689 26.3533 17.9355 26.2125 18.534C26.0716 19.1326 26.0452 19.8104 26.1332 20.5675H29.1702V26.9319H23.334V20.0393C23.334 17.9619 23.8269 16.395 24.8128 15.3386C25.8163 14.2647 27.2688 13.9038 29.1702 14.2559ZM21.0364 14.2559L20.7195 16.7119C19.9449 16.6591 19.3463 16.7999 18.9238 17.1344C18.5012 17.4689 18.2195 17.9355 18.0787 18.534C17.9379 19.1326 17.9114 19.8104 17.9995 20.5675H21.0364V26.9319H15.2002V20.0393C15.2002 17.9619 15.6932 16.395 16.6791 15.3386C17.6826 14.2647 19.135 13.9038 21.0364 14.2559Z"
                      fill="white"
                    />
                  </svg>
                  <p className="mt-4">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Fuga quasi dolores porro nesciunt nihil optio, maxime ad
                    nostrum quaerat consectetur minus aliquam, provident
                    perspiciatis modi, doloremque illum numquam odio ab.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-1/2 relative h-[720px]">
              <Image
                src="/landing/illu1.png"
                layout="fill"
                objectFit="cover"
                alt="Illustration 1"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

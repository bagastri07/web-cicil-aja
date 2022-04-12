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
                <div className="">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga
                  quasi dolores porro nesciunt nihil optio, maxime ad nostrum
                  quaerat consectetur minus aliquam, provident perspiciatis
                  modi, doloremque illum numquam odio ab.
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

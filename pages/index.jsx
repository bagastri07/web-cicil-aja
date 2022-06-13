import { Button } from "@chakra-ui/react";
import Image from "next/image";
import Navbar from "../components/navbar";
import Seo from "../components/seo";
import { useRouter } from "next/router";
import Slider from "react-slick";
import { IconMainWallet } from "../components/icons/icon";

export default function Home() {
  const router = useRouter();
  const sliderSettings = {
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

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
        <section className=" bg-gray-200 w-full p-5 text-center font-bold text-2xl flex justify-center items-center">
          <h2>Diawasi oleh</h2>
          <div className="flex justify-center items-center">
            <Image
              src="/landing/ojk.png"
              width={150}
              height={150}
              alt="logo ojk"
            />
          </div>
          tp boong
        </section>
        <section className="w-full flex justify-center px-14 py-10 bg-white">
          <div className="w-full max-w-6xl">
            <div className="flex w-1/2">
              <div>
                <h2 className="text-5xl leading-tight font-bold mt-14">
                  Full online hanya melalui website
                </h2>
                <p className="mt-5 w-2/3">
                  Tidak perlu datang ke kantor ataupun kemana saja, cukup daftar
                  dan gunakan dari rumah kapanpun kamu butuh. Sangat mudah dan
                  praktis untuk menggunakan CicilAja.
                </p>
              </div>
            </div>
            <div className="flex gap-5 w-full mt-10">
              <div className="border w-1/3 border-gray-200 p-5 rounded-xl">
                <div className="font-bold text-lg">01</div>
                <div className="flex flex-col gap-5 text-center items-center p-5">
                  <IconMainWallet.firstBlue />
                  <h4 className="text-2xl font-semibold">
                    Daftar & Masukkan Data Diri
                  </h4>
                  <p className="text-gray-600">
                    Buat akun dan masukkan data diri seperti Kartu Tanda
                    Penduduk, Kartu Keluarga, dan lainnya.
                  </p>
                </div>
              </div>
              <div className="border w-1/3 border-gray-200 p-5 rounded-xl">
                <div className="font-bold text-lg">02</div>
                <div className="flex flex-col gap-5 text-center items-center p-5">
                  <IconMainWallet.secOrange />
                  <h4 className="text-2xl font-semibold">
                    Ajukan Pinjaman Secara Online
                  </h4>
                  <p className="text-gray-600">
                    Ajukan pinjaman secara online sesuai jumlah nominal dan
                    rentang waktu yang dibutuhkan, kami akan melihat dan
                    me-review pinjamanmu secepatnya.
                  </p>
                </div>
              </div>
              <div className="border w-1/3 border-gray-200 p-5 rounded-xl">
                <div className="font-bold text-lg">03</div>
                <div className="flex flex-col gap-5 text-center items-center p-5">
                  <IconMainWallet.thirdYellow />
                  <h4 className="text-2xl font-semibold">
                    Tunggu Pinjaman & Cairkan Langsung ke Rekeningmu
                  </h4>
                  <p className="text-gray-600">
                    Setelah menunggu kami me-review dan mempersiapkan uangmu,
                    kamu dapat mencairkannya langsung dari rumah secara cepat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center px-14 py-10 bg-white">
          <div className="w-full max-w-6xl">
            <div className="flex flex-col-reverse gap-5">
              <div className="w-full py-10">
                <Slider {...sliderSettings}>
                  <div className="w-full">
                    <div className="bg-gray-100 rounded-2xl p-6 max-w-md mt-10">
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
                        Sebagai mahasiswa, saya selalu takut ketika ingin
                        meminjam uang dan lainnya, namun sekarang menggunakan
                        CicilAja. Hidup saya terasa lebih mudah. <br />
                        <br /> - Anies, Mahasiswa desain di UPH
                      </p>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="bg-gray-100 rounded-2xl p-6 max-w-md mt-10">
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
                        Terkadang orang tua saya tidak memberi uang saku saya
                        tepat waktu, karena itu saya menggunakan CicilAja untuk
                        membayar kuliah. <br />
                        <br /> - Rika, mahasiswa Teknik Sipil di ITB
                      </p>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="bg-gray-100 rounded-2xl p-6 max-w-md mt-10">
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
                        Cicil aja membantu saya saat tanggal-tanggal tua, hehe.
                        Ditambah lagi cicilannya tidak membebani dan bunganya
                        sangat kecil. <br />
                        <br /> - Rizal, mahasiswa Manajemen di Telkom University
                      </p>
                    </div>
                  </div>
                </Slider>
              </div>
              <div className="ml-5">
                <h2 className="text-5xl leading-tight font-bold mt-14">
                  Apa kata mereka?
                </h2>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

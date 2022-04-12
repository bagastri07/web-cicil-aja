import Head from "next/head";
import { Input, Button, Box } from "@chakra-ui/react";

import DatePicker from "react-datepicker";

import { useState } from "react";
import { useRouter } from "next/router";

const Register = () => {
  const [regist, setRegist] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const router = useRouter();

  return (
    <div
      className="
        transition duration-300
        bg-white
        sm:font-sans sm:bg-gradient-to-br from-blue-50 to-blue-400
        sm:w-screen h-screen sm:py-20
        flex items-center justify-center
      "
    >
      <Head>
        <title>Cicil - Register</title>
      </Head>
      <Box height="550px">
        <div
          className="
          bg-white text-center
          max-w-sm h-full mx-auto rounded-3xl p-14 pt-10"
        >
          <h1 className="text-4xl font-semibold text-gray-900">
            Register Form
          </h1>
          {regist ? (
            <>
              <p className="text-gray-400 text-xs mt-3">
                Register your username & password
              </p>
              <div className="flex flex-col gap-1 mt-6">
                <label htmlFor="" className="text-left opacity-60 text-sm">
                  Name
                </label>
                <Input
                  type="text"
                  colorScheme="purple"
                  rounded="md"
                  placeholder="Name"
                  size="md"
                />
                <label htmlFor="" className="text-left opacity-60 text-sm">
                  Birthday
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
                <label htmlFor="" className="text-left opacity-60 text-sm">
                  Email
                </label>
                <Input
                  type="email"
                  colorScheme="purple"
                  rounded="md"
                  placeholder="Email"
                  size="md"
                />
                <label htmlFor="" className="text-left opacity-60 text-sm">
                  Password
                </label>
                <Input
                  type="password"
                  colorScheme="purple"
                  rounded="md"
                  placeholder="Password"
                  size="md"
                />
                <Button
                  colorScheme="purple"
                  onClick={() => setRegist(false)}
                  marginTop="5"
                >
                  Register
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-400 text-xs mt-3">
                Input your personal data
              </p>
              <div className="flex flex-col gap-1 mt-6">
                <label htmlFor="" className="text-left opacity-60 text-sm">
                  University
                </label>
                <Input
                  type="text"
                  colorScheme="purple"
                  rounded="md"
                  placeholder="University"
                  size="md"
                />
                <label htmlFor="" className="text-left opacity-60 text-sm">
                  Study Program
                </label>
                <Input
                  type="text"
                  colorScheme="purple"
                  rounded="md"
                  placeholder="Study Program"
                  size="md"
                />
                <label htmlFor="" className="text-left opacity-60 text-sm">
                  Student Number
                </label>
                <Input
                  type="number"
                  colorScheme="purple"
                  rounded="md"
                  placeholder="Student Number"
                  size="md"
                />
                <label htmlFor="" className="text-left opacity-60 text-sm">
                  Phone Number
                </label>
                <Input
                  type="number"
                  colorScheme="purple"
                  rounded="md"
                  placeholder="Phone Number"
                  size="md"
                />
                <Button
                  colorScheme="purple"
                  onClick={() => setRegist(false)}
                  marginTop="5"
                >
                  Register
                </Button>
              </div>
            </>
          )}
          <p className="text-gray-400 text-sm mt-5">
            Already have an account?
            <b
              onClick={() => router.push("/login")}
              className="cursor-pointer hover:text-gray-600 transition duration-300"
            >
              {" "}
              Login
            </b>
            .
          </p>
        </div>
      </Box>
    </div>
  );
};

export default Register;

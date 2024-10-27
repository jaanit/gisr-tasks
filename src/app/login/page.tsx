import Logo from "@/components/Logo";
import LoginForm from "@/components/login/LoginForm";
import { Card } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (


        <>
          <div className="flex bg-[#f3f3f4] h-screen w-screen">
            <div className="md:w-2/3 p-2 w-full bg-[#6c95e0] md:bg-[#f3f3f4]  flex flex-col gap-8 items-center justify-center ">
              <Logo />
              <Card withBorder shadow="md" radius={"md"} p={"lg"} className="flex flex-col justify-center !w-full md:!w-[520px]">
                <h1 className="text-2xl font-bold">Login</h1>
                <LoginForm />
              </Card>
              <h1 className="text-sm font-bold">Don't have an account <Link className= "text-blue-500" href = "/signup" > Signup</Link></h1>
            </div>
            <div className="hidden md:block w-2/3 w-full flex justify-center items-center">
              <img src="bg.png" alt="cover" style={{ width: '100%', height: '100vh' }}  />
            </div>
          </div>
        </>
  );
}

import { auth, signIn, signOut } from "@/auth";
import Authors from "@/models/author";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();


  return (
    <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href={"/"}>
          <Image src={"/logo.png"} alt="logo" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href={"/startup/create"}>
                <span className="py-[6px] px-2 text-white rounded-sm bg-green-500">
                  Create
                </span>
              </Link>

              {/* React 19 uses server side props similar to server action */}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="py-[3px] px-2 text-white rounded-sm bg-red-500"
                >
                  Logout
                </button>
              </form>
              <Link href={"/user/" + session?.user?.id}>
                <span className="bg-pink-200 px-3 py-2 rounded-full">
                  {session?.user?.name?.[0]}
                </span>
              </Link>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <button type="submit">Login</button>
              </form>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

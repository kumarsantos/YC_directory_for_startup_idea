import { auth } from "@/auth";
import { StartupCardSkeleton } from "@/components/StartupCard";
import UserStartups from "@/components/UserStartups";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

const getProfileDetails = async (id: string) => {
  const response = await fetch(
    `http://localhost:3000/api/authors?authorId=${id}`
  );
  const result = await response.json();
  return result?.data;
};

const Profile = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const profileDetails = await getProfileDetails(id);
  const user = profileDetails?.[0] ?? {};
  const session = await auth();

  const currentSession = {
    ...session,
    _id: "672a5065ad3b16d0bdfd77c0",
  };

  if (profileDetails?.length <= 0) {
    return notFound();
  }

  return (
    <>
      <section className="profile_container ">
        <div className="profile_card !bg-pink-600 ">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user?.name}
            </h3>
          </div>
          <Image
            src={user?.imageUrl}
            alt="profile-image"
            height={220}
            width={220}
            className="profile_image"
          />
          <p className="text-30-extrabold mt-7 text-center">
            @{user?.username}
          </p>
          <p className="mt-1 text-center text-14-normal">{user?.bio}</p>
        </div>
        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">
            {currentSession?._id === id ? "Your" : "All"} Startups
          </p>
          <ul className="card_grid-sm">
            {/* USER STARTUPS */}
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Profile;

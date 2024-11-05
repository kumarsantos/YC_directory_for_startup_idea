import React from "react";
import StartupCard, { PostProps } from "./StartupCard";

const getAllStartupsByUserId = async (id: string) => {
  const response = await fetch(
    `https://yc-directory-for-startup-idea-hciy.vercel.app/api/startups?userId=${id}`
  );
  const result = await response.json();
  return result?.data;
};

const UserStartups = async ({ id }: { id: string }) => {
  const allStartups = await getAllStartupsByUserId(id);

  return (
    <>
      {allStartups?.length > 0
        ? allStartups.map((startup: PostProps) => {
            return (
              <StartupCard
                key={startup?.startupInfo?._id}
                post={{
                  ...startup?.startupInfo,
                  author: { ...startup?.authorInfo },
                }}
              />
            );
          })
        : null}
    </>
  );
};

export default UserStartups;

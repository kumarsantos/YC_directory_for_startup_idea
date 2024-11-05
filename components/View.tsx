import React from "react";
import Ping from "./Ping";

type QueryParam = string | null | undefined;

const getViews = async (id: QueryParam) => {
  const response = await fetch("https://yc-directory-for-startup-idea-hciy-2th385bil.vercel.app/api/views", {
    method: "PUT",
    body: JSON.stringify({ id }),
  });
  const result = await response.json();
  return result?.data;
};

const View = async ({ id }: { id: string }) => {
  const totalViews = await getViews(id);

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">{totalViews ?? 0} views</span>
      </p>
    </div>
  );
};

export default View;

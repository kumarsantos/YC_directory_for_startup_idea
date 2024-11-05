import { formatDate } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import View from "@/components/View";

const md = markdownit({
  html: true,
  xhtmlOut: true,
  breaks: true,
  langPrefix: "language-",
  linkify: true,
  typographer: true,
  quotes: "“”‘’",
});

// export const experimental_ppr = true; // which config same in next.config.ts

const getStartups = async (id: string) => {
  const response = await fetch(
    `https://yc-directory-for-startup-idea-hciy.vercel.app/api/startups?startupId=${id}`
  );
  const result = await response.json();
  return result?.data;
};

const Startup = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const startupDetails = await getStartups(id);

  if (!startupDetails?.length) {
    return notFound();
  }

  const { authorInfo, startupInfo } = startupDetails[0] ?? {};
  const parsedContent = md.renderInline(startupInfo?.pitch);

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(startupInfo?.createdAt)}</p>
        <h1 className="heading">{startupInfo?.title}</h1>
        <p className="sub-heading !max-w-5xl">{startupInfo?.description}</p>
      </section>
      <section className="section_container">
        <Image
          src={startupInfo?.imageUrl}
          alt="thumbnail"
          height={600}
          width={600}
          className="w-full h-auto rounded-md object-contain "
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auth">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${authorInfo?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={authorInfo?.imageUrl}
                alt="thumbnail"
                height={64}
                width={64}
                className="rounded-full object-contain drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{authorInfo?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{authorInfo?.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{startupInfo?.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>
        <hr className="divider" />

        <View id={startupInfo?._id} />
      </section>
    </>
  );
};

export default Startup;

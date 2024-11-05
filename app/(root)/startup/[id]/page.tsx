import { formatDate } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import View from "@/components/View";
//only for ppr
// import { unstable_after as after } from "next/server";

import hljs from "highlight.js"; // https://highlightjs.org

// full options list (defaults)
const md = markdownit({
  // Enable HTML tags in source
  html: true,
  // Use '/' to close single tags (<br />).
  // This is only for full CommonMark compatibility.
  xhtmlOut: true,
  // Convert '\n' in paragraphs into <br>
  breaks: true,
  // CSS language prefix for fenced blocks. Can be
  // useful for external highlighters.
  langPrefix: "language-",

  // Autoconvert URL-like text to links
  linkify: true,

  // Enable some language-neutral replacement + quotes beautification
  // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs
  typographer: true,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: "“”‘’",

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externally.
  // If result starts with <pre... internal wrapper is skipped.
  // highlight: function (str, lang) {
  //   console.log({ str, lang });
  //   if (lang && hljs.getLanguage(lang)) {
  //     try {
  //       return hljs.highlight(str, { language: lang, ignoreIllegals: true })
  //         .value;
  //     } catch (e) {}
  //   }
  //   return "";
  // },
});

// export const experimental_ppr = true; // which config same in next.config.ts

const getStartups = async (id: string) => {
  const response = await fetch(
    `http://localhost:3000/api/startups?startupId=${id}`
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
        {/* TODO: EDITOR SELECTED STARTUP */}
        <Suspense fallback={<p className="view_skeleton">Loading...</p>}>
          <View id={startupInfo?._id} />
        </Suspense>
      </section>
    </>
  );
};

export default Startup;

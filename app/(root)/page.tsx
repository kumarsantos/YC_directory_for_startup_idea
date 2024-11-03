import StartupCard, { PostProps } from "@/components/StartupCard";
import SearchFrom from "../../components/SearchFrom";

type QueryParam = string | null | undefined;

const getStartups = async (query: QueryParam) => {
  const response = await fetch(
    "http://localhost:3000/api/startups?searchKey=" + query
  );
  const result = await response.json();
  return result?.data;
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const posts = await getStartups(query);

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchFrom query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search result for "${query}"` : "All Startup"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts?.map((post: PostProps) => (
              <StartupCard
                key={post?.startupInfo?._id}
                post={{ ...post?.startupInfo, author: post?.authorInfo }}
              />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}

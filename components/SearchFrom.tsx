import Form from "next/form";
import SearchFormReset from "./SearchFormReset";

//Here Form from next this is part of react19 and it changes url without reloading
//Server side render form for search component
const SearchFrom = ({ query }: { query?: string }) => {
  return (
    <Form action={"/"} scroll={false} className="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search Startups"
      />
      <div className="flex gap-2">
        {query && <SearchFormReset />}
        <button type="submit" className="search-btn text-white">
          S
        </button>
      </div>
    </Form>
  );
};

export default SearchFrom;

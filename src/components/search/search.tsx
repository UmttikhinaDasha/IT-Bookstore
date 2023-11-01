import { useState, ChangeEvent } from "react";
import "./search.scss";

export const Search = () => {
  const [searchData, setSearchData] = useState<string>("");

  const onChangeSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  return (
    <form className="search">
      <input
        className="search__input"
        type="text"
        value={searchData}
        onChange={onChangeSearchData}
        placeholder="Search books by title, author, ISBN or keywords"
      />
    </form>
  );
};

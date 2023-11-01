import { useState, ChangeEvent, FC } from "react";
import clsx from "clsx";
import "./search.scss";

interface ISearch {
  /** Дополнительные стили. */
  className?: string;
}

export const Search: FC<ISearch> = (props) => {
  const { className } = props;

  const [searchData, setSearchData] = useState<string>("");

  const onChangeSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  return (
    <form className={clsx("search", className)}>
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

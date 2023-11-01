import { Search } from "../search/search";
import "./header.scss";

export const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">IT Bookstore</h1>
      <Search />
    </header>
  );
};

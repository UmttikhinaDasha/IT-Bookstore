import { BOOKS } from "../../consts/books";
import { Carousel } from "../carousel/carousel";
import { Header } from "../header/header";
import { BookPreview } from "../bookPreview/bookPreview";
import { NavigationMenu } from "../navigationMenu/navigationMenu";
import { IBook } from "../../types/bookType";
import "./app.scss";
import { ProductСategory } from "../productСategory/productСategory";
import { CONTENT_NAVIGATION_MENU } from "../../consts/contentNavMenu";
import { BookDescription } from "../../pages/bookDescription/bookDescription";
import { BOOK } from "../../consts/book";
import { Categories } from "../../pages/categories/categories";
import { Books } from "../../pages/books/books";

function App() {
  const renderBooks = (books: IBook[]): JSX.Element[] => {
    return books.map((book) => (
      <BookPreview
        key={book.isbn13}
        ISBN={book.isbn13}
        image={book.image}
        title={book.title}
        subtitle={book.subtitle}
        price={book.price}
        className="item"
      />
    ));
  };

  return (
    <header>
      <Header />
      <NavigationMenu content={CONTENT_NAVIGATION_MENU} />

      {/* <ProductСategory title="All books" className="category">
        <Carousel items={renderBooks(BOOKS)} />
      </ProductСategory>

      <ProductСategory title="New" className="category">
        <Carousel items={renderBooks(BOOKS)} />
      </ProductСategory> */}

      {/* <BookDescription {...BOOK} /> */}
      {/* <Categories /> */}
      <Books />
    </header>
  );
}

export default App;

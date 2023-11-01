import { BookPreview } from "../../components/bookPreview/bookPreview";
import { BOOKS } from "../../consts/books";
import { IBookPreview } from "../../types/bookType";
import "./books.scss";

export const Books = () => {
  const renderBooks = (books: IBookPreview[]) => {
    return books.map((book) => <BookPreview key={book.ISBN} {...book} />);
  };

  return (
    <div className="books _container">
      <main className="books__content">{renderBooks(BOOKS)}</main>
    </div>
  );
};

import "./bookPreview.scss";
import defaultImage from "../../assets/images/defaultImage.jpg";
import Heart from "../../assets/icons/heart.svg?react";
import Bag from "../../assets/icons/bag.svg?react";
import { Button } from "../button/button";
import { FC } from "react";
import clsx from "clsx";
import { Price } from "../price/price";
import { IBookPreview } from "../../types/bookType";

export const BookPreview: FC<IBookPreview> = (props) => {
  const {
    ISBN,
    image = defaultImage,
    title,
    subtitle,
    price,
    isNew = false,
    className,
  } = props;

  const renderOverlay = (): JSX.Element => {
    return (
      <div className="book-preview__overlay">
        <Price className="book-preview__price">{price}</Price>
        <h4 className="book-preview__title">{title}</h4>
        <span className="book-preview__author">{subtitle}</span>

        <Button
          Icon={Bag}
          theme="transparent-blue"
          className="book-preview__button-add"
        >
          Add to Basket
        </Button>
      </div>
    );
  };

  return (
    <div className={clsx("book-preview", className)}>
      <div className="book-preview__panel">
        <button className="book-preview__button-heart">
          <Heart />
        </button>
        {isNew && <span className="book-preview__badge">New</span>}
      </div>
      <img src={image} className="book-preview__image" />

      <h4 className="book-preview__title">{title}</h4>
      <span className="book-preview__author">{subtitle}</span>
      <Price>{price}</Price>

      {renderOverlay()}
    </div>
  );
};

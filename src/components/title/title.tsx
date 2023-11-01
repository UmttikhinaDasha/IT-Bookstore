import { FC } from "react";
import "./title.scss";
import clsx from "clsx";

interface ITitle {
  /** Header content. */
  readonly children: string;
  /** Additional styles. */
  readonly className?: string;
}

export const Title: FC<ITitle> = (prors) => {
  const { children, className } = prors;

  return (
    <div className={clsx("title", className)}>
      <h2 className="title__content">{children}</h2>
      <div className="title__line" />
    </div>
  );
};

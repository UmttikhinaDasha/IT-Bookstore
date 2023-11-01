import { FC, useCallback } from "react";
import { IContantNavType } from "../../types/contentNavType";
import "./navigationMenu.scss";

interface INavigationMenu {
  content: IContantNavType[];
}

export const NavigationMenu: FC<INavigationMenu> = (props) => {
  const { content } = props;

  const renderNavigationContent = useCallback(() => {
    return content.map((item, index) => (
      <li key={index} className="navigation-menu__item">
        {item.title}
      </li>
    ));
  }, [content]);

  return (
    <nav className="navigation-menu">
      <ul className="navigation-menu__list _container">
        {renderNavigationContent()}
      </ul>
    </nav>
  );
};

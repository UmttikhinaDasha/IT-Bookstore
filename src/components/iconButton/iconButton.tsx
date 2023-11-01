import { FC } from "react";
import "./iconButton.scss";

interface IIconComponent {
  /** Компонент иконки. */
  readonly Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  /** Тема счетчика для отображения кол-ва товаров. */
  readonly counterTheme?: "grey" | "red";
  /** Количество товаров. */
  readonly counterValue?: number;
}

export const IconButton: FC<IIconComponent> = (props) => {
  const { Icon, counterTheme = "grey", counterValue = 0 } = props;

  return (
    <div className="icon-button">
      <div
        className={`icon-button__counter icon-button__counter_theme_${counterTheme}`}
      >
        {counterValue}
      </div>
      <Icon className="icon-button__icon" />
    </div>
  );
};

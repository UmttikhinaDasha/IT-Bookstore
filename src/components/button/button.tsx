import { FC } from "react";
import "./button.scss";
import clsx from "clsx";

interface IButton {
  /** Текст кнопки. */
  readonly children: string;
  /** Иконка перед текстом. */
  readonly Icon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  /** Тема кнопки. */
  readonly theme?: "blue" | "transparent-grey" | "transparent-blue";
  /** Модификатор отключения кнопки. */
  readonly disabled?: boolean;
  /** Дополнительные стили. */
  readonly className?: string;
}

export const Button: FC<IButton> = (props) => {
  const { children, Icon, theme = "blue", disabled = false, className } = props;

  return (
    <button
      className={clsx(
        "button",
        `button_theme_${theme}`,
        disabled && "button_disabled",
        className
      )}
    >
      {Icon && <Icon />}
      {children}
    </button>
  );
};

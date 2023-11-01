import { FC } from "react";

interface IIconComponent {
  Icon: JSX.Element;
}

export const IconButton: FC<IIconComponent> = (props) => {
  const { Icon } = props;

  return <Icon></Icon>;
};

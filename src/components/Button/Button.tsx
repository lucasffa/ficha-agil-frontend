import { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

import './button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

type LinkProps = {
  pathname: string;
  name?: string;
  className?: string;
  img?: any;
  onClickFunction?: () => void;
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props} />
  );
}

export function ButtonLink({
  name,
  pathname,
  className,
  img,
  onClickFunction,
}: LinkProps) {
  const handleClick = () => {
    if (onClickFunction) {
      onClickFunction();
    }
  };

  return (
    <Link
      className={className}
      to={pathname}
      style={{ textDecoration: 'none' }}
      onClick={() => handleClick()}
    >
      {name || img}
    </Link>
  );
}

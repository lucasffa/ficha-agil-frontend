import { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

import './button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

type LinkProps = {
  path: string;
  name: string;
  className: string;
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props} />
  );
}

export function ButtonLink({ name, path, className }: LinkProps) {
  return (
    <Link className={className} to={path}>
      {name}
    </Link>
  );
}

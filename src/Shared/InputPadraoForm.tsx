interface InputPadraoFormProps {
  placeholder: string;
  type: string;
  name?: string;
  className: string;
  control?: any;
  error?: string;
}

export default function InputPadraoForm({
  placeholder,
  className,
  type,
}: InputPadraoFormProps) {
  return <input type={type} className={className} placeholder={placeholder} />;
}

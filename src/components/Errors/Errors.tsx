type InputErrorsProp = {
  error?: string;
};

export default function InputErrors({ error }: InputErrorsProp) {
  return <span style={{ color: 'red' }}>{error}</span>;
}

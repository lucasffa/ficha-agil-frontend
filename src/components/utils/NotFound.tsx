import { ButtonLink } from '../Button/Button';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <h1 style={{ fontSize: '65px' }}>404</h1>
      <h1>Ops! Não encontramos essa página</h1>
      <br />
      <ButtonLink
        name="IR PARA A PÁGINA INICIAL"
        pathname="/dashboard"
        className="button"
      />
    </div>
  );
}

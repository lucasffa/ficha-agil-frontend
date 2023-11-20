import React from 'react';
import closeIcon from '../assets/images/close.svg';

const BACKGROUND_STYLE: React.CSSProperties = {
  position: 'fixed',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  backgroundColor: 'rgb(0,0,0, 0.7)',
  zIndex: '1000',
};

const MODAL_STYLE: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  backgroundColor: '#fff',
  borderRadius: '10px',
  color: 'black',
  width: '50%',
  height: '50%',
};

const BUTTON_STYLE: React.CSSProperties = {
  cursor: 'pointer',
  alignSelf: 'center',
  background: 'none',
  border: 'none',
};

const IMG_STYLE: React.CSSProperties = {
  width: 20,
  height: 20,
  background: 'none',
};

const TITLE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  borderBottom: '1px solid #ddd',
};

const MODAL_DIVS_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  width: '100%',
  height: '100%',
};
const BOTTOM_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
};

const CHILDREN_STYLE: React.CSSProperties = {
  padding: '20px',
  overflow: 'auto',
  height: '100%',
};

type ModalProps = {
  isOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: string;
  title: string;
  handleConfirm: () => void;
};
export default function Modal({
  isOpen,
  setModalOpen,
  children,
  title,
  handleConfirm,
}: ModalProps) {
  if (isOpen) {
    return (
      <div style={BACKGROUND_STYLE}>
        <div style={MODAL_STYLE}>
          <div style={MODAL_DIVS_STYLE}>
            <div style={TITLE_STYLE}>
              <h3>
                <strong>{title}</strong>
              </h3>
              <button
                style={BUTTON_STYLE}
                type="button"
                onClick={() => setModalOpen(false)}
              >
                <img
                  src={closeIcon}
                  alt="Excluir Candidato"
                  style={IMG_STYLE}
                />
              </button>
            </div>

            <p style={CHILDREN_STYLE}>{children}</p>
            <div style={BOTTOM_STYLE}>
              <button
                style={{
                  width: '15%',
                  height: '100%',
                  border: 0,
                  fontWeight: 500,
                  color: 'black',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  background: '#80808045',
                }}
                onClick={() => setModalOpen(false)}
              >
                Não
              </button>
              <button
                style={{
                  width: '15%',
                  height: '100%',
                  background: '#A2B63D',
                  borderRadius: '2px',
                  fontWeight: 500,
                  color: '#fff',
                  padding: '0 32px',
                  border: 0,
                  cursor: 'pointer',
                }}
                onClick={handleConfirm}
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

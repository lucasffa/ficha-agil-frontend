import './blockUI.scss';

type BlockUIProps = {
  blocking: boolean;
};

const BlockUI = (props: BlockUIProps) => {
  if (!props.blocking) {
    return null;
  } else {
    return (
      <div className="overlay">
        <svg className="spinner" viewBox="0 0 50 50">
          <circle
            className="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
          ></circle>
        </svg>
      </div>
    );
  }
};

export default BlockUI;

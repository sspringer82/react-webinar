import { ComponentType, useState } from 'react';

type ButtonProps = {
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  log: (item: unknown) => void;
};

const Button: React.FC<ButtonProps> = ({ title, onClick, log }) => {
  return (
    <button
      onClick={(e) => {
        log(e);
        onClick(e);
      }}
    >
      {title}
    </button>
  );
};

function withLogger<P>(
  Component: ComponentType<P & { log: (item: unknown) => void }>
) {
  function log(item: unknown) {
    console.log('Logger: ', item);
  }

  return function (props: P) {
    // props Spreading <Component {...props} />
    return (
      <>
        <Component log={log} {...props} />
      </>
    );
  };
}

//const ButtonWithLogger = withLogger<Omit<ButtonProps, 'log'>>(Button);
const ButtonWithLogger = withLogger<{
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}>(Button);

const App: React.FC = () => {
  return (
    <div>
      <ButtonWithLogger
        onClick={() => console.log('click handled')}
        title="click me if you can"
      />
    </div>
  );
};

export default App;

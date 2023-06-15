import { ReactNode, useEffect } from 'react';

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

type LoggerProps = {
  children: (log: (item: unknown) => void) => ReactNode;
};

function Logger({ children }: LoggerProps) {
  // insert your hooks here

  function log(item: unknown): void {
    console.log('Logger: ', item);
  }

  return children(log);
}

function App() {
  return (
    <div>
      {/* <Logger
        render={(log: (item: unknown) => void) => {
          return (
            <Button
              log={log}
              onClick={() => console.log('clicked')}
              title="Click me"
            />
          );
        }}
      /> */}
      <Logger>{(log: (item: unknown) => void) => <div>Hallo welt</div>}</Logger>
    </div>
  );
}

export default App;

type ButtonProps = {
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

type UseLoggerReturnType = [(item: unknown) => void];

function useLogger(): UseLoggerReturnType {
  // use hooks in here

  function log(item: unknown): void {
    console.log('Logger: ', item);
  }

  return [log];
}

const Button: React.FC<ButtonProps> = ({ title, onClick }) => {
  const [log] = useLogger();

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

function App() {
  return (
    <div>
      <Button title="click me" onClick={() => console.log('clicked')} />
    </div>
  );
}

export default App;

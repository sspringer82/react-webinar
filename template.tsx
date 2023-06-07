import React from 'react';

type Props = {
  name: string;
};

const App: React.FC<Props> = ({ name }) => {
  return <div>Hallo Welt</div>;
};

export default App;

export default function ListItem({ name }: Props): React.ReactNode {
  <div>asdfads</div>;
}

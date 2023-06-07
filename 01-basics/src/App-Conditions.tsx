import './App.css';
import React from 'react';
import { Book } from './Book';

const data: Book[] = [];

const App: React.FC = () => {
  if (data.length === 0) {
    return <div>Keine Bücher gefunden</div>;
  } else {
    return (
      <div>
        {data.map((book) => (
          <div key={book.id}>{book.title}</div>
        ))}
      </div>
    );
  }

  // # Bedingung mit if und Variable
  // let content = <div>Keine Bücher gefunden</div>;

  // if (data.length > 0) {
  //   content = (
  //     <div>
  //       {data.map((book) => (
  //         <div key={book.id}>{book.title}</div>
  //       ))}
  //     </div>
  //   );
  // }

  // return content;

  // # Bedingung mit logischem UND
  // return (
  //   <div>
  //     {data.length === 0 && <div>Nix da</div>}
  //     {data.length > 0 &&
  //       data.map((book) => <div key={book.id}>{book.title}</div>)}
  //   </div>
  // );

  // # Bedingung mit Ternäroperator
  // return (
  //   <div>
  //     {data.length === 0 ? (
  //       <div>Nix da</div>
  //     ) : (
  //       data.map((book) => <div key={book.id}>{book.title}</div>)
  //     )}
  //   </div>
  // );
};

export default App;

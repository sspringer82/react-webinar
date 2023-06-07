import './App.css';
import React, { useEffect, useState } from 'react';
import { Book } from './Book';

const data: Book[] = [
  {
    id: 1,
    isbn: '978-3-86680-192-9',
    title: "The Hitchhiker's Guide to the Galaxy",
    author: 'Douglas Adams',
    price: 9.99,
    pages: 224,
    year: 1979,
  },
  {
    id: 2,
    isbn: '978-3-423-14045-9',
    title: '1984',
    author: 'George Orwell',
    price: 8.99,
    pages: 400,
    year: 1949,
  },
];

const App: React.FC = () => {
  console.log('RENDER');

  const [headline, setHeadline] = useState('Hallo Welt');
  useEffect(() => {
    // Für seiteneffekte wie Timeouts oder Serverkommunikation
    setTimeout(() => {
      console.log('change the headline');
      setHeadline('react ist groß'); // state überschreiben
      setHeadline((prevHeadline) => prevHeadline + '!'); // state aktualisieren
    }, 1000);
  }, []);

  // useEffect(() => {}) - wird bei jedem Update ausführt
  // useEffect(() => {}, [dep]) - wird bei jeder Wertänderung von dep ausgeführt
  // useEffect(() => {}, []) - wird nur beim Einhängen der Komponente ausgeführt

  if (data.length === 0) {
    return <div>Keine Bücher gefunden</div>;
  }

  return (
    <div>
      <h1>{headline}</h1>
      <div>
        {data.map((book) => (
          <div key={book.id}>{book.title}</div>
        ))}
      </div>
    </div>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const response = await fetch(`http://localhost:3001/notes`);
    const json = await response.json();

    setNotes(json);
  };

  return (
    <>
      <nav className="bg-slate-800 py-2">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">
            dotMD
          </Link>

          <Link to="/create" className="text-md text-white">
            Create
          </Link>
        </div>
      </nav>

      <div className="container mx-auto mt-6 flex">
        <div className="w-1/2 md:w-1/3 pr-2">
          <ul className="rounded-md border text-md text-slate-700">
            {notes.map((note) => {
              return (
                <li
                  key={note.id}
                  className="cursor-pointer border-b px-4 py-2 hover:bg-slate-200"
                >
                  <Link to={`/view/${note.id}`}>
                    <strong>{note.title}</strong>
                    <p className="leading text-xs text-slate-500">
                      {note.content?.substring(0, 120)}...
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="w-1/2 md:w-2/3 px-4 text-md">
          <p>Please select a note from the sidebar</p>
        </div>
      </div>
    </>
  );
};

export default Home;

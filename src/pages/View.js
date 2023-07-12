import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { marked } from "marked";

const View = () => {
  const loaderData = useLoaderData();

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
            {loaderData.list.map((note) => {
              return (
                <li
                  key={note.id}
                  className={`cursor-pointer border-b px-4 py-2 ${
                    note.id !== loaderData.id
                      ? "hover:bg-slate-200"
                      : "bg-slate-200"
                  }`}
                >
                  <Link to={`/view/${note.id}`} className="block">
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
          <h2 className="text-lg font-semibold">{loaderData.note.title}</h2>
          <hr className="my-4" />
          <div
            className="markdown"
            dangerouslySetInnerHTML={{
              __html: marked.parse(loaderData.note.content),
            }}
          ></div>
          <div className="mt-4 text-sm">
            <Link to={`/edit/${loaderData.note.id}`} className="text-slate-400">
              [Edit]
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;

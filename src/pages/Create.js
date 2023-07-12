import { useState } from "react";
import { Form, Link } from "react-router-dom";
import { marked } from "marked";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <Form method="post">
      <nav className="bg-slate-800 py-2">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">
            dotMD
          </Link>

          <button
            type="submit"
            className="text-md text-slate-800 bg-white rounded inline-block px-3 py-1 hover:bg-slate-200"
          >
            Create
          </button>
        </div>
      </nav>

      <div className="container mx-auto mt-6 flex">
        <div className="w-1/2 md:w-2/3 mr-4 text-md">
          <input
            type="text"
            className="w-full border px-3 py-2 rounded border-slate-400"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
          />
          <hr className="my-4" />
          <textarea
            placeholder="Note Content"
            className="w-full h-96 border px-3 py-2 rounded border-slate-400"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            name="content"
          ></textarea>
        </div>
        <div className="w-1/2 md:w-2/3 px-4 text-md">
          <h2 className="text-lg font-semibold py-2">{title}</h2>
          <hr className="my-4" />
          <div
            className="markdown"
            dangerouslySetInnerHTML={{
              __html: marked.parse(content),
            }}
          ></div>
        </div>
      </div>
    </Form>
  );
};

export default Create;

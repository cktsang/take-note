import React from "react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import { PenSquareIcon, TrashIcon } from "lucide-react";

const NoteCard = ({ note }) => {
  return (
    <Link to={`/note/${note._id}`} className="card">
      <div className="card-body">
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        <div className="card-footer">
          <span>{formatDate(new Date(note.createdAt))}</span>
          <div>
            <PenSquareIcon />
            <button>
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;

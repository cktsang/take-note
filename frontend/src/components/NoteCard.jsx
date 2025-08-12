import React from "react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import { PenSquareIcon, TrashIcon } from "lucide-react";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await fetch("http://localhost:5001/api/notes/" + id, {
        method: "DELETE",
      });
      console.log("Deleted: ", id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error("Failed to delete note");
      console.log(error);
    }
  };
  return (
    <div className="card">
      <div className="card-content">
        <Link to={`/note/${note._id}`}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </Link>
        <div className="card-footer">
          <span>{formatDate(new Date(note.createdAt))}</span>
          <div className="card-btns">
            <button>
              <Link to={`/note/${note._id}`}>
                <PenSquareIcon />
              </Link>
            </button>
            <button
              onClick={(e) => handleDelete(e, note._id)}
              className="card-delete-btn"
              aria-label="Delete note"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5001/api/notes");
        const data = await res.json();
        console.log(data);
        setNotes(data);
      } catch (error) {
        toast.error("Failed to load notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="notes">
        <div className="notes-container">
          {loading && <span>Loading...</span>}
          <ul className="notes-layout">
            {notes.length > 0
              ? notes.map((note) => (
                  <NoteCard key={note._id} note={note} setNotes={setNotes} />
                ))
              : "No notes to display"}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

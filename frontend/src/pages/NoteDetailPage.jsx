import { ArrowLeftIcon, TrashIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useParams, useNavigate } from "react-router";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    try {
      const fetchNote = async () => {
        const res = await fetch(`http://localhost:5001/api/notes/${id}`);
        const data = await res.json();
        reset(data);
      };

      fetchNote();
    } catch (error) {
      toast.error("Failed to fetch note");
    }
  }, []);

  const onSubmit = async (data) => {
    const response = await fetch(`http://localhost:5001/api/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: data.title,
        content: data.content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (!response.ok) {
      toast.error(responseData.message);
    } else {
      toast.success("Note updated succesfully");
      navigate("/");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await fetch(`http://localhost:5001/api/notes/${id}`, {
        method: "DELETE",
      });
      toast.success("Note deleted succesfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note");
      console.log("Error deleting note:", error);
    }
  };

  return (
    <div className="detail-page">
      <div className="detail-container">
        <div className="detail-header">
          <Link to="/" className="detail-back-btn">
            <ArrowLeftIcon /> <span>Back to notes</span>
          </Link>
          <button onClick={() => handleDelete()} className="detail-delete-btn">
            <TrashIcon />
            <span>Delete note</span>
          </button>
        </div>
        <div className="detail-content">
          <h1>Details</h1>
          {errors.title && (
            <span className="error">{errors.title.message}</span>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="detail-form">
            <label htmlFor="title">Title</label>
            <input type="text" {...register("title", { required: true })} />
            <label htmlFor="Content">Content</label>
            <input type="text" {...register("content", { required: true })} />
            <button
              type="submit"
              disabled={isSubmitting}
              className="update-btn"
            >
              {isSubmitting ? "Updating..." : "Update Note"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;

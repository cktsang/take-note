import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreatePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:5001/api/notes", {
      method: "POST",
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
      toast.success("Note created successfully");
      reset();
    }
  };

  return (
    <div className="create-page">
      <div className="create-container">
        <Link to="/" className="create-back-btn">
          <ArrowLeftIcon /> <span>Back to notes</span>
        </Link>
        <div className="create-content">
          <h1>Create Note</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="create-form">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Title"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
              })}
            />
            {errors.title && (
              <span className="error">{errors.title.message}</span>
            )}
            <label htmlFor="content">Content</label>
            <input type="text" placeholder="Content" {...register("content")} />
            <button
              className="create-btn"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Note"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;

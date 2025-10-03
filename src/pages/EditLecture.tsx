import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const EditLecture = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");

  useEffect(() => {
    api.get(`/lectures/${id}`).then((res) => {
      const lec = res.data;
      setTitle(lec.title);
      setCourseCode(lec.courseCode);
      setScheduledAt(lec.scheduledAt.slice(0, 16)); // adjust for datetime-local
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.put(`/lectures/${id}`, { title, courseCode, scheduledAt });
    navigate(`/lectures/${id}`);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Lecture</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        />
        <input
          type="datetime-local"
          className="w-full border p-2 rounded"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditLecture;
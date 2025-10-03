import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios.ts";

interface Lecture {
  _id: string;
  title: string;
  courseCode: string;
  scheduledAt: string;
}

const LectureDetail = () => {
  const { id } = useParams();
  const [lecture, setLecture] = useState<Lecture | null>(null);

  useEffect(() => {
    api.get(`/lectures/${id}`).then((res) => setLecture(res.data));
  }, [id]);

  if (!lecture) return <div className="p-6">Loading lecture...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{lecture.title}</h1>
      <p className="mb-2">Course: {lecture.courseCode}</p>
      <p className="mb-2">
        Scheduled at: {new Date(lecture.scheduledAt).toLocaleString()}
      </p>

      <Link
        to={`/attendance/${lecture._id}`}
        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Manage Attendance
      </Link>
    </div>
  );
};

export default LectureDetail;

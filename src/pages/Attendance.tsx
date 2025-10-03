import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios.ts";

interface Lecture {
  title: string;
  courseCode: string;
  // add other properties if needed
}

interface Student {
  _id: string;
  name: string;
  email: string;
  // add other properties if needed
}

const Attendance = () => {
  const { id } = useParams();
  const [students, setStudents] = useState<Student[]>([]);
  const [lecture, setLecture] = useState<Lecture | null>(null);

  useEffect(() => {
    // get lecture info
    api.get(`/lectures/${id}`).then((res) => setLecture(res.data));
    // get all students (backend should expose /students)
    api.get("/students").then((res) => setStudents(res.data));
  }, [id]);

  const markAttendance = async (studentId:any, status:any) => {
    await api.post("/attendance/mark", {
      lectureId: id,
      studentId,
      status,
    });
    alert(`Marked ${status} for student`);
  };

  if (!lecture) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Attendance</h1>
      <p className="mb-4">
        {lecture.title} ({lecture.courseCode})
      </p>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id} className="border">
              <td className="p-2 border">{s.name}</td>
              <td className="p-2 border">{s.email}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => markAttendance(s._id, "present")}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Present
                </button>
                <button
                  onClick={() => markAttendance(s._id, "absent")}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Absent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;

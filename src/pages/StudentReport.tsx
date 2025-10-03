import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

interface AttendanceRecord {
  lecture: {
    title: string;
    courseCode: string;
    scheduledAt: string;
  };
  status: string;
}

const StudentReport = () => {
  const { id } = useParams();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    api.get(`/attendance/student/${id}/report`).then((res) => {
      setRecords(res.data);
    });
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Student Report</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Lecture</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec, idx) => (
            <tr key={idx}>
              <td className="p-2 border">{rec.lecture.title}</td>
              <td className="p-2 border">
                {new Date(rec.lecture.scheduledAt).toLocaleString()}
              </td>
              <td
                className={`p-2 border ${
                  rec.status === "present" ? "text-green-600" : "text-red-600"
                }`}
              >
                {rec.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentReport;

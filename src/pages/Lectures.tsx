import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Plus, Calendar, Users, Clock } from "lucide-react";
import api from "../api/axios";

interface Lecture {
  _id: string;
  title: string;
  courseCode: string;
  description?: string;
  createdAt?: string;
}

const Lectures = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const res = await api.get("/lectures");
        setLectures(res.data);
      } catch (error) {
        console.error("Error fetching lectures:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading lectures...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lectures</h1>
          <p className="text-gray-600 mt-1">Manage your course lectures and attendance</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Link to="/lectures/create" className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Create Lecture</span>
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{lectures.length}</p>
                <p className="text-sm text-gray-600">Total Lectures</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {lectures.filter(lec => {
                    const today = new Date();
                    const lectureDate = new Date(lec.createdAt || '');
                    return lectureDate.toDateString() === today.toDateString();
                  }).length}
                </p>
                <p className="text-sm text-gray-600">Today's Lectures</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">Active</p>
                <p className="text-sm text-gray-600">System Status</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lectures Grid */}
      {lectures.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No lectures yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first lecture</p>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Link to="/lectures/create" className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Lecture</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lectures.map((lecture) => (
            <Card key={lecture._id} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
                      {lecture.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      {lecture.description || "No description available"}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    {lecture.courseCode}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>
                      Created {lecture.createdAt ? new Date(lecture.createdAt).toLocaleDateString() : 'Recently'}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link to={`/lectures/${lecture._id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link to={`/lectures/${lecture._id}/edit`}>
                        Edit
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Lectures;

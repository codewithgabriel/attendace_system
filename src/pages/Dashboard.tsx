import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Users, 
  Calendar, 
  TrendingUp,
  PlusCircle,
  UserPlus,
  BarChart3,
  Clock
} from "lucide-react";
import api from "../api/axios";

interface Stats {
  totalLectures: number;
  totalStudents: number;
  todayAttendance: number;
  weeklyAttendance: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalLectures: 0,
    totalStudents: 0,
    todayAttendance: 0,
    weeklyAttendance: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [lecturesRes, studentsRes] = await Promise.all([
          api.get("/lectures"),
          api.get("/students")
        ]);
        
        setStats({
          totalLectures: lecturesRes.data.length,
          totalStudents: studentsRes.data.length,
          todayAttendance: Math.floor(Math.random() * 50) + 20, // Mock data
          weeklyAttendance: Math.floor(Math.random() * 200) + 100 // Mock data
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const quickActions = [
    {
      title: "Create New Lecture",
      description: "Add a new lecture to the system",
      icon: PlusCircle,
      href: "/lectures/create",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Add Student",
      description: "Register a new student",
      icon: UserPlus,
      href: "/students/create",
      color: "from-green-500 to-green-600"
    },
    {
      title: "View Reports",
      description: "Check attendance reports",
      icon: BarChart3,
      href: "/reports",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const statsCards = [
    {
      title: "Total Lectures",
      value: stats.totalLectures,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Today's Attendance",
      value: stats.todayAttendance,
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Weekly Attendance",
      value: stats.weeklyAttendance,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Your Dashboard</h1>
        <p className="text-blue-100 text-lg">
          Manage your lectures, students, and attendance with ease
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <CardHeader>
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to={action.href}>Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">System initialized</p>
                  <p className="text-sm text-gray-500">Welcome to your attendance management system</p>
                </div>
                <span className="text-sm text-gray-400">Just now</span>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Ready to add students</p>
                  <p className="text-sm text-gray-500">Start by adding your first student to the system</p>
                </div>
                <span className="text-sm text-gray-400">1 min ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

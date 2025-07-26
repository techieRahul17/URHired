"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Briefcase, FileText, Calendar, CheckCircle, Clock, Bell, MapPin } from "lucide-react"
import PageLayout from "../../components/layout/PageLayout"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Badge from "../../components/ui/Badge"

const Dashboard = () => {
    const [stats, setStats] = useState({
        applications: 0,
        interviews: 0,
        savedJobs: 0,
    })

    const [applications, setApplications] = useState([])
    const [upcomingInterviews, setUpcomingInterviews] = useState([])
    const [recommendedJobs, setRecommendedJobs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setStats({
                applications: 8,
                interviews: 2,
                savedJobs: 5,
            })

            setApplications([
                {
                    id: 1,
                    position: "Senior Frontend Developer",
                    company: "Tech Solutions Inc.",
                    status: "interview",
                    appliedDate: "2 days ago",
                },
                { id: 2, position: "UX/UI Designer", company: "Creative Designs", status: "review", appliedDate: "5 days ago" },
                {
                    id: 3,
                    position: "Full Stack Developer",
                    company: "Innovate Labs",
                    status: "rejected",
                    appliedDate: "1 week ago",
                },
            ])

            setUpcomingInterviews([
                {
                    id: 1,
                    position: "Senior Frontend Developer",
                    company: "Tech Solutions Inc.",
                    date: "Today",
                    time: "2:00 PM - 3:00 PM",
                    type: "Technical Interview",
                    format: "Video Call",
                },
                {
                    id: 2,
                    position: "UX/UI Designer",
                    company: "Creative Designs",
                    date: "Tomorrow",
                    time: "10:00 AM - 11:00 AM",
                    type: "Initial Screening",
                    format: "Video Call",
                },
            ])

            setRecommendedJobs([
                { id: 1, position: "React Developer", company: "Digital Innovations", location: "Remote", matchScore: 95 },
                { id: 2, position: "Frontend Engineer", company: "Tech Giants", location: "San Francisco, CA", matchScore: 92 },
                { id: 3, position: "UI Developer", company: "Creative Solutions", location: "New York, NY", matchScore: 88 },
            ])

            setLoading(false)
        }, 1500)
    }, [])

    const statCards = [
        {
            title: "Applications",
            value: stats.applications,
            icon: <FileText size={24} className="text-purple-600" />,
            color: "bg-purple-100",
        },
        {
            title: "Interviews",
            value: stats.interviews,
            icon: <Calendar size={24} className="text-indigo-600" />,
            color: "bg-indigo-100",
        },
        {
            title: "Saved Jobs",
            value: stats.savedJobs,
            icon: <Briefcase size={24} className="text-blue-600" />,
            color: "bg-blue-100",
        },
    ]

    const getStatusBadge = (status) => {
        switch (status) {
            case "interview":
                return <Badge variant="primary">Interview Scheduled</Badge>
            case "review":
                return <Badge variant="warning">Under Review</Badge>
            case "rejected":
                return <Badge variant="danger">Not Selected</Badge>
            default:
                return null
        }
    }

    return (
        <PageLayout title="Dashboard">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {statCards.map((stat, index) => (
                            <motion.div
                                key={stat.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <Card className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-gray-500 text-sm">{stat.title}</p>
                                            <h3 className="text-2xl font-bold mt-1 text-black">{stat.value}</h3>
                                        </div>
                                        <div className={`p-3 rounded-full ${stat.color}`}>{stat.icon}</div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Upcoming Interviews */}
                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-black">Upcoming Interviews</h2>
                            <Button variant="outline" size="sm">
                                View All
                            </Button>
                        </div>

                        {upcomingInterviews.length > 0 ? (
                            <div className="space-y-4">
                                {upcomingInterviews.map((interview, index) => (
                                    <motion.div
                                        key={interview.id}
                                        className="p-4 border border-gray-200 rounded-lg hover:border-purple-200 transition-colors"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                            <div>
                                                <h3 className="font-medium text-gray-900">{interview.position}</h3>
                                                <p className="text-sm text-gray-500">{interview.company}</p>

                                                <div className="mt-2 space-y-1">
                                                    <div className="flex items-center text-sm text-black">
                                                        <Calendar size={14} className="mr-2 text-gray-500" />
                                                        <span>{interview.date}</span>
                                                    </div>
                                                    <div className="flex items-center text-sm text-black">
                                                        <Clock size={14} className="mr-2 text-gray-500" />
                                                        <span>{interview.time}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 md:mt-0 flex flex-col md:items-end">
                                                <Badge variant="primary" size="sm">
                                                    {interview.type}
                                                </Badge>
                                                <p className="text-sm text-gray-500 mt-1">{interview.format}</p>

                                                <Button variant="primary" size="sm" className="mt-3">
                                                    Join Interview
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="p-3 bg-purple-100 rounded-full inline-block mb-3">
                                    <Calendar size={24} className="text-purple-600" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-1">No upcoming interviews</h3>
                                <p className="text-gray-500">When you have interviews scheduled, they will appear here</p>
                            </div>
                        )}
                    </Card>

                    {/* Recent Applications */}
                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-black">Recent Applications</h2>
                            <Button variant="outline" size="sm">
                                View All
                            </Button>
                        </div>

                        {applications.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Position
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Company
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Applied
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {applications.map((application) => (
                                        <tr key={application.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{application.position}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.company}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(application.status)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.appliedDate}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Button variant="ghost" size="sm">
                                                    View
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="p-3 bg-purple-100 rounded-full inline-block mb-3">
                                    <FileText size={24} className="text-purple-600" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-1">No applications yet</h3>
                                <p className="text-gray-500 mb-4">Start applying to jobs to see your applications here</p>
                                <Button variant="primary" size="sm">
                                    Browse Jobs
                                </Button>
                            </div>
                        )}
                    </Card>

                    {/* Recommended Jobs */}
                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-black">Recommended for You</h2>
                            <Button variant="outline" size="sm">
                                View More
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recommendedJobs.map((job, index) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <Card className="h-full" hover>
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-2 bg-purple-100 rounded-full">
                                                    <Briefcase size={20} className="text-purple-600" />
                                                </div>
                                                <Badge variant={job.matchScore >= 90 ? "success" : "primary"}>{job.matchScore}% Match</Badge>
                                            </div>

                                            <h3 className="text-lg font-bold text-gray-900 mb-1">{job.position}</h3>
                                            <p className="text-sm text-gray-500 mb-4">{job.company}</p>

                                            <div className="flex items-center text-sm text-gray-600 mb-4">
                                                <MapPin size={16} className="mr-2" />
                                                {job.location}
                                            </div>

                                            <Button variant="outline" fullWidth>
                                                View Job
                                            </Button>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </Card>

                    {/* Notifications */}
                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-black">Recent Notifications</h2>
                            <Button variant="outline" size="sm">
                                View All
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start p-3 border border-gray-200 rounded-lg">
                                <div className="p-2 bg-purple-100 rounded-full mr-4">
                                    <Bell size={20} className="text-purple-600" />
                                </div>
                                <div>
                                    <p className="font-medium">Interview Reminder</p>
                                    <p className="text-sm text-gray-500">
                                        Your interview for Senior Frontend Developer at Tech Solutions Inc. is scheduled for today at 2:00
                                        PM.
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                                </div>
                            </div>

                            <div className="flex items-start p-3 border border-gray-200 rounded-lg">
                                <div className="p-2 bg-green-100 rounded-full mr-4">
                                    <CheckCircle size={20} className="text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium">Application Reviewed</p>
                                    <p className="text-sm text-gray-500">
                                        Your application for UX/UI Designer at Creative Designs has been reviewed. Check status for more
                                        details.
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                                </div>
                            </div>

                            <div className="flex items-start p-3 border border-gray-200 rounded-lg">
                                <div className="p-2 bg-blue-100 rounded-full mr-4">
                                    <Briefcase size={20} className="text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium">New Job Recommendations</p>
                                    <p className="text-sm text-gray-500">
                                        We've found 5 new jobs that match your profile. Check them out!
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">3 days ago</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </PageLayout>
    )
}

export default Dashboard


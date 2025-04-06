"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Briefcase, Calendar, TrendingUp, FileText } from "lucide-react"
import PageLayout from "../../components/layout/PageLayout"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Badge from "../../components/ui/Badge"
import ProgressBar from "../../components/ui/ProgressBar"

const Dashboard = () => {
    const [stats, setStats] = useState({
        activeJobs: 0,
        totalApplications: 0,
        scheduledInterviews: 0,
        hiringRate: 0,
    })

    const [recentJobs, setRecentJobs] = useState([])
    const [topCandidates, setTopCandidates] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setStats({
                activeJobs: 12,
                totalApplications: 145,
                scheduledInterviews: 28,
                hiringRate: 68,
            })

            setRecentJobs([
                {
                    id: 1,
                    title: "Senior Frontend Developer",
                    location: "Remote",
                    applicants: 24,
                    status: "active",
                    postedDate: "2 days ago",
                },
                {
                    id: 2,
                    title: "Machine Learning Engineer",
                    location: "New York, NY",
                    applicants: 18,
                    status: "active",
                    postedDate: "3 days ago",
                },
                {
                    id: 3,
                    title: "UX/UI Designer",
                    location: "San Francisco, CA",
                    applicants: 32,
                    status: "active",
                    postedDate: "5 days ago",
                },
                {
                    id: 4,
                    title: "DevOps Engineer",
                    location: "Remote",
                    applicants: 15,
                    status: "closed",
                    postedDate: "1 week ago",
                },
            ])

            setTopCandidates([
                { id: 1, name: "John Doe", position: "Senior Frontend Developer", matchScore: 92, status: "interview" },
                { id: 2, name: "Jane Smith", position: "Machine Learning Engineer", matchScore: 88, status: "review" },
                { id: 3, name: "Alex Johnson", position: "UX/UI Designer", matchScore: 85, status: "interview" },
            ])

            setLoading(false)
        }, 1500)
    }, [])

    const statCards = [
        {
            title: "Active Jobs",
            value: stats.activeJobs,
            icon: <Briefcase size={24} className="text-purple-600" />,
            color: "bg-purple-100",
        },
        {
            title: "Total Applications",
            value: stats.totalApplications,
            icon: <FileText size={24} className="text-indigo-600" />,
            color: "bg-indigo-100",
        },
        {
            title: "Scheduled Interviews",
            value: stats.scheduledInterviews,
            icon: <Calendar size={24} className="text-blue-600" />,
            color: "bg-blue-100",
        },
        {
            title: "Hiring Rate",
            value: `${stats.hiringRate}%`,
            icon: <TrendingUp size={24} className="text-green-600" />,
            color: "bg-green-100",
        },
    ]

    const getStatusBadge = (status) => {
        switch (status) {
            case "active":
                return <Badge variant="success">Active</Badge>
            case "closed":
                return <Badge variant="secondary">Closed</Badge>
            case "draft":
                return <Badge variant="warning">Draft</Badge>
            default:
                return null
        }
    }

    const getCandidateStatusBadge = (status) => {
        switch (status) {
            case "interview":
                return <Badge variant="primary">Interview Scheduled</Badge>
            case "review":
                return <Badge variant="warning">Under Review</Badge>
            case "hired":
                return <Badge variant="success">Hired</Badge>
            case "rejected":
                return <Badge variant="danger">Rejected</Badge>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                                            <p className="text-gray-600 text-sm">{stat.title}</p>
                                            <h3 className="text-2xl font-bold mt-1 text-gray-900">{stat.value}</h3>
                                        </div>
                                        <div className={`p-3 rounded-full ${stat.color}`}>{stat.icon}</div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recent Jobs */}
                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Recent Job Postings</h2>
                            <Button variant="outline" size="sm">
                                View All Jobs
                            </Button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        Job Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        Applicants
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        Posted
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {recentJobs.map((job) => (
                                    <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{job.title}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{job.location}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{job.applicants}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(job.status)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{job.postedDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Button variant="ghost" size="sm">
                                                <span className="text-gray-700">View</span>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    {/* Top Candidates */}
                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Top Matched Candidates</h2>
                            <Button variant="outline" size="sm">
                                View All Candidates
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {topCandidates.map((candidate, index) => (
                                <motion.div
                                    key={candidate.id}
                                    className="p-4 border border-gray-200 rounded-lg hover:border-purple-200 transition-colors"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                                            <p className="text-sm text-gray-600">{candidate.position}</p>
                                        </div>

                                        <div className="mt-2 md:mt-0 flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                                            <div className="flex items-center">
                                                <span className="text-sm font-medium text-gray-700 mr-2">Match Score:</span>
                                                <Badge variant={candidate.matchScore >= 90 ? "success" : "primary"}>
                                                    {candidate.matchScore}%
                                                </Badge>
                                            </div>

                                            <div>{getCandidateStatusBadge(candidate.status)}</div>

                                            <Button variant="ghost" size="sm">
                                                <span className="text-gray-700">View Profile</span>
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </Card>

                    {/* Recruitment Progress */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="p-6">
                            <h2 className="text-xl font-bold mb-6 text-gray-900">Recruitment Progress</h2>

                            <div className="space-y-4">
                                <div>
                                    <ProgressBar label="Resume Screening" value={85} max={100} color="primary" />
                                </div>
                                <div>
                                    <ProgressBar label="Aptitude Tests" value={62} max={100} color="primary" />
                                </div>
                                <div>
                                    <ProgressBar label="Technical Interviews" value={45} max={100} color="primary" />
                                </div>
                                <div>
                                    <ProgressBar label="Final Interviews" value={28} max={100} color="primary" />
                                </div>
                                <div>
                                    <ProgressBar label="Offers Sent" value={15} max={100} color="success" />
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-xl font-bold mb-6 text-gray-900">Upcoming Interviews</h2>

                            <div className="space-y-4">
                                <div className="flex items-start p-3 border border-gray-200 rounded-lg">
                                    <div className="p-2 bg-purple-100 rounded-full mr-4">
                                        <Calendar size={20} className="text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">John Doe - Senior Frontend Developer</p>
                                        <p className="text-sm text-gray-600">Today, 2:00 PM - 3:00 PM</p>
                                        <div className="mt-2 flex space-x-2">
                                            <Badge variant="primary" size="sm">
                                                Technical
                                            </Badge>
                                            <Badge variant="secondary" size="sm">
                                                Remote
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start p-3 border border-gray-200 rounded-lg">
                                    <div className="p-2 bg-purple-100 rounded-full mr-4">
                                        <Calendar size={20} className="text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Jane Smith - Machine Learning Engineer</p>
                                        <p className="text-sm text-gray-600">Tomorrow, 10:00 AM - 11:30 AM</p>
                                        <div className="mt-2 flex space-x-2">
                                            <Badge variant="primary" size="sm">
                                                Technical
                                            </Badge>
                                            <Badge variant="secondary" size="sm">
                                                Remote
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start p-3 border border-gray-200 rounded-lg">
                                    <div className="p-2 bg-purple-100 rounded-full mr-4">
                                        <Calendar size={20} className="text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Alex Johnson - UX/UI Designer</p>
                                        <p className="text-sm text-gray-600">Apr 8, 1:00 PM - 2:00 PM</p>
                                        <div className="mt-2 flex space-x-2">
                                            <Badge variant="success" size="sm">
                                                Final
                                            </Badge>
                                            <Badge variant="secondary" size="sm">
                                                In-person
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mt-4">
                                    <Button variant="outline" size="sm">
                                        View All Interviews
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            )}
        </PageLayout>
    )
}

export default Dashboard
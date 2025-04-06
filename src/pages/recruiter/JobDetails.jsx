"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
    ArrowLeft,
    Edit,
    Trash2,
    Calendar,
    Clock,
    Briefcase,
    DollarSign,
    FileText,
    CheckCircle,
    XCircle,
} from "lucide-react"
import PageLayout from "../../components/layout/PageLayout"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Badge from "../../components/ui/Badge"
import Avatar from "../../components/ui/Avatar"

const JobDetails = () => {
    const { id } = useParams()
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("overview")

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setJob({
                id: Number.parseInt(id),
                title: "Senior Frontend Developer",
                department: "Engineering",
                location: "Remote",
                type: "Full-time",
                salary: "$120,000 - $150,000",
                experience: "5+ years",
                postedDate: "April 2, 2025",
                deadline: "April 30, 2025",
                status: "active",
                applicants: 24,
                description: `
          <p>We are looking for a Senior Frontend Developer to join our engineering team. You will be responsible for building and maintaining our web applications, working closely with our design and backend teams.</p>
          
          <h4>Responsibilities:</h4>
          <ul>
            <li>Develop new user-facing features using React.js</li>
            <li>Build reusable components and libraries for future use</li>
            <li>Translate designs and wireframes into high-quality code</li>
            <li>Optimize components for maximum performance across devices and browsers</li>
            <li>Collaborate with backend developers and designers</li>
          </ul>
          
          <h4>Requirements:</h4>
          <ul>
            <li>5+ years of experience in frontend development</li>
            <li>Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model</li>
            <li>Thorough understanding of React.js and its core principles</li>
            <li>Experience with popular React.js workflows (Redux, Hooks, etc.)</li>
            <li>Familiarity with RESTful APIs and modern authorization mechanisms</li>
            <li>Knowledge of modern frontend build pipelines and tools</li>
            <li>Experience with common frontend development tools such as Babel, Webpack, NPM, etc.</li>
            <li>Good understanding of browser rendering behavior and performance</li>
          </ul>
        `,
                topCandidates: [
                    { id: 1, name: "John Doe", matchScore: 92, status: "interview" },
                    { id: 2, name: "Jane Smith", matchScore: 88, status: "review" },
                    { id: 3, name: "Alex Johnson", matchScore: 85, status: "interview" },
                    { id: 4, name: "Emily Brown", matchScore: 82, status: "review" },
                    { id: 5, name: "Michael Wilson", matchScore: 78, status: "new" },
                ],
                recentActivities: [
                    { id: 1, type: "application", user: "Emily Brown", time: "2 hours ago" },
                    { id: 2, type: "interview_scheduled", user: "John Doe", time: "5 hours ago" },
                    { id: 3, type: "application", user: "Michael Wilson", time: "1 day ago" },
                    { id: 4, type: "application_reviewed", user: "Jane Smith", time: "2 days ago" },
                ],
            })

            setLoading(false)
        }, 1500)
    }, [id])

    const getCandidateStatusBadge = (status) => {
        switch (status) {
            case "interview":
                return <Badge variant="primary">Interview Scheduled</Badge>
            case "review":
                return <Badge variant="warning">Under Review</Badge>
            case "new":
                return <Badge variant="info">New Application</Badge>
            case "hired":
                return <Badge variant="success">Hired</Badge>
            case "rejected":
                return <Badge variant="danger">Rejected</Badge>
            default:
                return null
        }
    }

    const getActivityIcon = (type) => {
        switch (type) {
            case "application":
                return <FileText size={16} className="text-purple-600" />
            case "interview_scheduled":
                return <Calendar size={16} className="text-blue-600" />
            case "application_reviewed":
                return <CheckCircle size={16} className="text-green-600" />
            case "application_rejected":
                return <XCircle size={16} className="text-red-600" />
            default:
                return null
        }
    }

    if (loading) {
        return (
            <PageLayout title="Job Details">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            </PageLayout>
        )
    }

    return (
        <PageLayout title="Job Details">
            <div className="mb-6">
                <Link
                    to="/recruiter/jobs"
                    className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors"
                >
                    <ArrowLeft size={16} className="mr-1" />
                    Back to Jobs
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card className="p-6 mb-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                            <div>
                                <div className="flex items-center mb-2">
                                    <h1 className="text-2xl font-bold text-gray-900 mr-3">{job.title}</h1>
                                    <Badge variant="success">Active</Badge>
                                </div>
                                <p className="text-gray-700 mb-4">
                                    {job.department} • {job.location}
                                </p>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                                    <div className="flex items-center">
                                        <Briefcase size={16} className="mr-1 text-gray-600" />
                                        {job.type}
                                    </div>
                                    <div className="flex items-center">
                                        <DollarSign size={16} className="mr-1 text-gray-600" />
                                        {job.salary}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock size={16} className="mr-1 text-gray-600" />
                                        {job.experience}
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar size={16} className="mr-1 text-gray-600" />
                                        Deadline: {job.deadline}
                                    </div>
                                </div>
                            </div>

                            <div className="flex mt-4 md:mt-0 space-x-2">
                                <Button variant="outline" size="sm" icon={<Edit size={16} className="text-gray-700" />}>
                                    <span className="text-gray-700">Edit</span>
                                </Button>
                                <Button variant="danger" size="sm" icon={<Trash2 size={16} />}>
                                    Delete
                                </Button>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <div className="flex border-b border-gray-200 mb-6">
                                <button
                                    className={`pb-3 px-4 text-sm font-medium ${
                                        activeTab === "overview"
                                            ? "text-purple-600 border-b-2 border-purple-600"
                                            : "text-gray-700 hover:text-gray-900"
                                    }`}
                                    onClick={() => setActiveTab("overview")}
                                >
                                    Overview
                                </button>
                                <button
                                    className={`pb-3 px-4 text-sm font-medium ${
                                        activeTab === "candidates"
                                            ? "text-purple-600 border-b-2 border-purple-600"
                                            : "text-gray-700 hover:text-gray-900"
                                    }`}
                                    onClick={() => setActiveTab("candidates")}
                                >
                                    Candidates ({job.applicants})
                                </button>
                                <button
                                    className={`pb-3 px-4 text-sm font-medium ${
                                        activeTab === "activity"
                                            ? "text-purple-600 border-b-2 border-purple-600"
                                            : "text-gray-700 hover:text-gray-900"
                                    }`}
                                    onClick={() => setActiveTab("activity")}
                                >
                                    Activity
                                </button>
                            </div>

                            {activeTab === "overview" && (
                                <div
                                    className="prose prose-purple max-w-none text-gray-800"
                                    dangerouslySetInnerHTML={{ __html: job.description }}
                                ></div>
                            )}

                            {activeTab === "candidates" && (
                                <div className="space-y-4">
                                    {job.topCandidates.map((candidate) => (
                                        <motion.div
                                            key={candidate.id}
                                            className="p-4 border border-gray-200 rounded-lg hover:border-purple-200 transition-colors"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <Avatar src={null} alt={candidate.name} size="md" />
                                                    <div className="ml-3">
                                                        <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                                                        <div className="flex items-center mt-1">
                                                            <Badge variant={candidate.matchScore >= 90 ? "success" : "primary"} size="sm">
                                                                {candidate.matchScore}% Match
                                                            </Badge>
                                                            <span className="mx-2 text-gray-300">•</span>
                                                            {getCandidateStatusBadge(candidate.status)}
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button variant="outline" size="sm">
                                                    <span className="text-gray-700">View Profile</span>
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}

                                    <div className="text-center mt-6">
                                        <Button variant="outline">View All Candidates</Button>
                                    </div>
                                </div>
                            )}

                            {activeTab === "activity" && (
                                <div className="space-y-4">
                                    {job.recentActivities.map((activity) => (
                                        <div key={activity.id} className="flex items-start">
                                            <div className="p-2 bg-gray-100 rounded-full mr-3">{getActivityIcon(activity.type)}</div>
                                            <div>
                                                <p className="text-gray-800">
                                                    {activity.type === "application" && (
                                                        <span>
                                                            <strong>{activity.user}</strong> applied for this position
                                                        </span>
                                                    )}
                                                    {activity.type === "interview_scheduled" && (
                                                        <span>
                                                            Interview scheduled with <strong>{activity.user}</strong>
                                                        </span>
                                                    )}
                                                    {activity.type === "application_reviewed" && (
                                                        <span>
                                                            Application from <strong>{activity.user}</strong> was reviewed
                                                        </span>
                                                    )}
                                                    {activity.type === "application_rejected" && (
                                                        <span>
                                                            Application from <strong>{activity.user}</strong> was rejected
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="text-xs text-gray-600 mt-1">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card className="p-6 mb-6">
                        <h2 className="text-lg font-bold mb-4 text-gray-900">Job Summary</h2>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Posted On</p>
                                <p className="font-medium text-gray-800">{job.postedDate}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-1">Application Deadline</p>
                                <p className="font-medium text-gray-800">{job.deadline}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-1">Department</p>
                                <p className="font-medium text-gray-800">{job.department}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-1">Location</p>
                                <p className="font-medium text-gray-800">{job.location}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-1">Employment Type</p>
                                <p className="font-medium text-gray-800">{job.type}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-1">Salary Range</p>
                                <p className="font-medium text-gray-800">{job.salary}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-1">Experience Required</p>
                                <p className="font-medium text-gray-800">{job.experience}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Applicants</p>
                                <p className="font-medium text-gray-800">{job.applicants}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-lg font-bold mb-4 text-gray-900">Quick Actions</h2>

                        <div className="space-y-3">
                            <Button variant="primary" fullWidth>
                                View All Applicants
                            </Button>

                            <Button variant="outline" fullWidth>
                                Edit Job Posting
                            </Button>

                            <Button variant="outline" fullWidth>
                                Duplicate Job
                            </Button>

                            <Button variant="outline" fullWidth>
                                Close Job Posting
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </PageLayout>
    )
}

export default JobDetails
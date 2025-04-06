"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, ChevronDown, FileText, CheckCircle, XCircle, Eye } from "lucide-react"
import PageLayout from "../../components/layout/PageLayout"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Badge from "../../components/ui/Badge"
import Input from "../../components/ui/Input"
import Avatar from "../../components/ui/Avatar"

const Applications = () => {
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [showFilters, setShowFilters] = useState(false)

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setApplications([
                {
                    id: 1,
                    candidate: { id: 1, name: "John Doe", email: "john.doe@example.com" },
                    job: { id: 1, title: "Senior Frontend Developer", department: "Engineering" },
                    matchScore: 92,
                    status: "interview",
                    appliedDate: "2 days ago",
                },
                {
                    id: 2,
                    candidate: { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
                    job: { id: 2, title: "Machine Learning Engineer", department: "Data Science" },
                    matchScore: 88,
                    status: "review",
                    appliedDate: "3 days ago",
                },
                {
                    id: 3,
                    candidate: { id: 3, name: "Alex Johnson", email: "alex.johnson@example.com" },
                    job: { id: 3, title: "UX/UI Designer", department: "Design" },
                    matchScore: 85,
                    status: "interview",
                    appliedDate: "5 days ago",
                },
                {
                    id: 4,
                    candidate: { id: 4, name: "Emily Brown", email: "emily.brown@example.com" },
                    job: { id: 1, title: "Senior Frontend Developer", department: "Engineering" },
                    matchScore: 82,
                    status: "new",
                    appliedDate: "1 day ago",
                },
                {
                    id: 5,
                    candidate: { id: 5, name: "Michael Wilson", email: "michael.wilson@example.com" },
                    job: { id: 1, title: "Senior Frontend Developer", department: "Engineering" },
                    matchScore: 78,
                    status: "new",
                    appliedDate: "1 day ago",
                },
                {
                    id: 6,
                    candidate: { id: 6, name: "Sarah Davis", email: "sarah.davis@example.com" },
                    job: { id: 5, title: "Product Manager", department: "Product" },
                    matchScore: 75,
                    status: "rejected",
                    appliedDate: "1 week ago",
                },
            ])

            setLoading(false)
        }, 1500)
    }, [])

    const filteredApplications = applications.filter((application) => {
        // Filter by search term
        const matchesSearch =
            application.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.job.department.toLowerCase().includes(searchTerm.toLowerCase())

        // Filter by status
        const matchesStatus = filterStatus === "all" || application.status === filterStatus

        return matchesSearch && matchesStatus
    })

    const getStatusBadge = (status) => {
        switch (status) {
            case "new":
                return <Badge variant="info">New</Badge>
            case "review":
                return <Badge variant="warning">Under Review</Badge>
            case "interview":
                return <Badge variant="primary">Interview Scheduled</Badge>
            case "hired":
                return <Badge variant="success">Hired</Badge>
            case "rejected":
                return <Badge variant="danger">Rejected</Badge>
            default:
                return null
        }
    }

    return (
        <PageLayout title="Applications">
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-black">
                <div className="flex-1">
                    <div className="relative">
                        <Input
                            placeholder="Search by candidate name, job title, or department..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            icon={<Search size={18} />}
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" onClick={() => setShowFilters(!showFilters)} icon={<Filter size={18} />}>
                        Filters
                        <ChevronDown size={16} className="ml-1" />
                    </Button>
                </div>
            </div>

            {showFilters && (
                <motion.div
                    className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-gray-900"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">All Statuses</option>
                                <option value="new">New</option>
                                <option value="review">Under Review</option>
                                <option value="interview">Interview Scheduled</option>
                                <option value="hired">Hired</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                            <select className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-gray-900">
                                <option value="all">All Jobs</option>
                                <option value="frontend">Senior Frontend Developer</option>
                                <option value="ml">Machine Learning Engineer</option>
                                <option value="design">UX/UI Designer</option>
                                <option value="product">Product Manager</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Match Score</label>
                            <select className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-gray-900">
                                <option value="all">All Scores</option>
                                <option value="90">90% and above</option>
                                <option value="80">80% and above</option>
                                <option value="70">70% and above</option>
                            </select>
                        </div>
                    </div>
                </motion.div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            ) : (
                <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Candidate
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Job Position
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Match Score
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
                            {filteredApplications.length > 0 ? (
                                filteredApplications.map((application) => (
                                    <tr key={application.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Avatar src={null} alt={application.candidate.name} size="sm" />
                                                <div className="ml-3">
                                                    <div className="font-medium text-gray-900">{application.candidate.name}</div>
                                                    <div className="text-sm text-gray-600">{application.candidate.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{application.job.title}</div>
                                            <div className="text-sm text-gray-600">{application.job.department}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Badge
                                                variant={
                                                    application.matchScore >= 90
                                                        ? "success"
                                                        : application.matchScore >= 80
                                                            ? "primary"
                                                            : application.matchScore >= 70
                                                                ? "warning"
                                                                : "secondary"
                                                }
                                            >
                                                {application.matchScore}%
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(application.status)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{application.appliedDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <Button variant="ghost" size="sm" icon={<Eye size={16} className="text-gray-700" />}>
                                                    <span className="text-gray-700">View</span>
                                                </Button>
                                                {application.status === "new" && (
                                                    <>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            icon={<CheckCircle size={16} className="text-green-600" />}
                                                        >
                                                            <span className="text-gray-700">Approve</span>
                                                        </Button>
                                                        <Button variant="ghost" size="sm" icon={<XCircle size={16} className="text-red-600" />}>
                                                            <span className="text-gray-700">Reject</span>
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="p-3 bg-purple-100 rounded-full mb-4">
                                                <FileText size={24} className="text-purple-600" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-1">No applications found</h3>
                                            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    setSearchTerm("")
                                                    setFilterStatus("all")
                                                }}
                                            >
                                                Clear Filters
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </PageLayout>
    )
}

export default Applications
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Video, MapPin, Search, Filter, ChevronDown, Plus, Phone } from "lucide-react"
import PageLayout from "../../components/layout/PageLayout"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Badge from "../../components/ui/Badge"
import Input from "../../components/ui/Input"
import Avatar from "../../components/ui/Avatar"

const Interviews = () => {
    const [interviews, setInterviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [showFilters, setShowFilters] = useState(false)

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setInterviews([
                {
                    id: 1,
                    candidate: { id: 1, name: "John Doe", email: "john.doe@example.com" },
                    job: { id: 1, title: "Senior Frontend Developer", department: "Engineering" },
                    date: "Today",
                    time: "2:00 PM - 3:00 PM",
                    type: "technical",
                    format: "video",
                    status: "scheduled",
                },
                {
                    id: 2,
                    candidate: { id: 3, name: "Alex Johnson", email: "alex.johnson@example.com" },
                    job: { id: 3, title: "UX/UI Designer", department: "Design" },
                    date: "Tomorrow",
                    time: "10:00 AM - 11:30 AM",
                    type: "technical",
                    format: "video",
                    status: "scheduled",
                },
                {
                    id: 3,
                    candidate: { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
                    job: { id: 2, title: "Machine Learning Engineer", department: "Data Science" },
                    date: "Apr 8, 2025",
                    time: "1:00 PM - 2:00 PM",
                    type: "final",
                    format: "in-person",
                    status: "scheduled",
                },
                {
                    id: 4,
                    candidate: { id: 7, name: "David Lee", email: "david.lee@example.com" },
                    job: { id: 5, title: "Product Manager", department: "Product" },
                    date: "Apr 10, 2025",
                    time: "11:00 AM - 12:00 PM",
                    type: "initial",
                    format: "video",
                    status: "scheduled",
                },
                {
                    id: 5,
                    candidate: { id: 8, name: "Lisa Wang", email: "lisa.wang@example.com" },
                    job: { id: 1, title: "Senior Frontend Developer", department: "Engineering" },
                    date: "Apr 3, 2025",
                    time: "3:00 PM - 4:00 PM",
                    type: "technical",
                    format: "video",
                    status: "completed",
                },
                {
                    id: 6,
                    candidate: { id: 9, name: "Robert Chen", email: "robert.chen@example.com" },
                    job: { id: 2, title: "Machine Learning Engineer", department: "Data Science" },
                    date: "Apr 2, 2025",
                    time: "10:30 AM - 11:30 AM",
                    type: "initial",
                    format: "video",
                    status: "cancelled",
                },
            ])

            setLoading(false)
        }, 1500)
    }, [])

    const filteredInterviews = interviews.filter((interview) => {
        // Filter by search term
        const matchesSearch =
            interview.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            interview.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            interview.job.department.toLowerCase().includes(searchTerm.toLowerCase())

        // Filter by status
        const matchesStatus = filterStatus === "all" || interview.status === filterStatus

        return matchesSearch && matchesStatus
    })

    const getStatusBadge = (status) => {
        switch (status) {
            case "scheduled":
                return <Badge variant="primary">Scheduled</Badge>
            case "completed":
                return <Badge variant="success">Completed</Badge>
            case "cancelled":
                return <Badge variant="danger">Cancelled</Badge>
            default:
                return null
        }
    }

    const getTypeBadge = (type) => {
        switch (type) {
            case "initial":
                return (
                    <Badge variant="info" size="sm">
                        Initial
                    </Badge>
                )
            case "technical":
                return (
                    <Badge variant="warning" size="sm">
                        Technical
                    </Badge>
                )
            case "final":
                return (
                    <Badge variant="success" size="sm">
                        Final
                    </Badge>
                )
            default:
                return null
        }
    }

    const getFormatIcon = (format) => {
        switch (format) {
            case "video":
                return <Video size={16} className="text-blue-500" />
            case "in-person":
                return <MapPin size={16} className="text-green-500" />
            case "phone":
                return <Phone size={16} className="text-purple-500" />
            default:
                return null
        }
    }

    return (
        <PageLayout title="Interviews">
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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

                    <Button variant="primary" icon={<Plus size={18} />}>
                        Schedule Interview
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
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">All Statuses</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Interview Type</label>
                            <select className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500">
                                <option value="all">All Types</option>
                                <option value="initial">Initial</option>
                                <option value="technical">Technical</option>
                                <option value="final">Final</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                            <select className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500">
                                <option value="all">All Formats</option>
                                <option value="video">Video</option>
                                <option value="in-person">In-person</option>
                                <option value="phone">Phone</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                            <select className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500">
                                <option value="all">All Dates</option>
                                <option value="today">Today</option>
                                <option value="tomorrow">Tomorrow</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredInterviews.length > 0 ? (
                        filteredInterviews.map((interview, index) => (
                            <motion.div
                                key={interview.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <Card className="h-full">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center">
                                                <Avatar src={null} alt={interview.candidate.name} size="md" />
                                                <div className="ml-3">
                                                    <h3 className="font-medium text-gray-900">{interview.candidate.name}</h3>
                                                    <p className="text-sm text-gray-500">{interview.job.title}</p>
                                                </div>
                                            </div>
                                            {getStatusBadge(interview.status)}
                                        </div>

                                        <div className="space-y-3 mb-4">
                                            <div className="flex items-center text-sm">
                                                <Calendar size={16} className="mr-2 text-gray-500" />
                                                <span>{interview.date}</span>
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <Clock size={16} className="mr-2 text-gray-500" />
                                                <span>{interview.time}</span>
                                            </div>
                                            <div className="flex items-center text-sm">
                                                {getFormatIcon(interview.format)}
                                                <span className="ml-2 capitalize">{interview.format} Interview</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div>{getTypeBadge(interview.type)}</div>

                                            <div className="flex space-x-2">
                                                {interview.status === "scheduled" && (
                                                    <>
                                                        <Button variant="outline" size="sm">
                                                            Reschedule
                                                        </Button>
                                                        <Button variant="primary" size="sm">
                                                            Join
                                                        </Button>
                                                    </>
                                                )}
                                                {interview.status === "completed" && (
                                                    <Button variant="outline" size="sm">
                                                        View Notes
                                                    </Button>
                                                )}
                                                {interview.status === "cancelled" && (
                                                    <Button variant="outline" size="sm">
                                                        Reschedule
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                            <div className="p-4 bg-purple-100 rounded-full mb-4">
                                <Calendar size={32} className="text-purple-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">No interviews found</h3>
                            <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
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
                    )}
                </div>
            )}
        </PageLayout>
    )
}

export default Interviews
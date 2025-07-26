"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Plus, Search, Filter, ChevronDown, Briefcase, MapPin, Users, Calendar } from "lucide-react"
import PageLayout from "../../components/layout/PageLayout"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Badge from "../../components/ui/Badge"
import Input from "../../components/ui/Input"

const Jobs = () => {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [showFilters, setShowFilters] = useState(false)

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setJobs([
                {
                    id: 1,
                    title: "Senior Frontend Developer",
                    department: "Engineering",
                    location: "Remote",
                    type: "Full-time",
                    applicants: 24,
                    status: "active",
                    postedDate: "2 days ago",
                    deadline: "Apr 30, 2025",
                },
                {
                    id: 2,
                    title: "Machine Learning Engineer",
                    department: "Data Science",
                    location: "New York, NY",
                    type: "Full-time",
                    applicants: 18,
                    status: "active",
                    postedDate: "3 days ago",
                    deadline: "May 15, 2025",
                },
                {
                    id: 3,
                    title: "UX/UI Designer",
                    department: "Design",
                    location: "San Francisco, CA",
                    type: "Full-time",
                    applicants: 32,
                    status: "active",
                    postedDate: "5 days ago",
                    deadline: "Apr 25, 2025",
                },
                {
                    id: 4,
                    title: "DevOps Engineer",
                    department: "Infrastructure",
                    location: "Remote",
                    type: "Full-time",
                    applicants: 15,
                    status: "closed",
                    postedDate: "1 week ago",
                    deadline: "Apr 10, 2025",
                },
                {
                    id: 5,
                    title: "Product Manager",
                    department: "Product",
                    location: "Austin, TX",
                    type: "Full-time",
                    applicants: 28,
                    status: "active",
                    postedDate: "1 week ago",
                    deadline: "May 5, 2025",
                },
                {
                    id: 6,
                    title: "Marketing Specialist",
                    department: "Marketing",
                    location: "Chicago, IL",
                    type: "Contract",
                    applicants: 12,
                    status: "draft",
                    postedDate: "2 weeks ago",
                    deadline: "May 20, 2025",
                },
            ])

            setLoading(false)
        }, 1500)
    }, [])

    const filteredJobs = jobs.filter((job) => {
        // Filter by search term
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.department.toLowerCase().includes(searchTerm.toLowerCase())

        // Filter by status
        const matchesStatus = filterStatus === "all" || job.status === filterStatus

        return matchesSearch && matchesStatus
    })

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

    return (
        <PageLayout title="Job Postings">
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-black">
                <div className="flex-1">
                    <div className="relative">
                        <Input
                            placeholder="Search jobs by title, location, or department..."
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
                        Create Job
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
                            <label className="block text-sm font-medium text-black mb-1">Status</label>
                            <select
                                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-black"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">All Statuses</option>
                                <option value="active">Active</option>
                                <option value="closed">Closed</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-1">Department</label>
                            <select className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-black">
                                <option value="all">All Departments</option>
                                <option value="engineering">Engineering</option>
                                <option value="design">Design</option>
                                <option value="marketing">Marketing</option>
                                <option value="product">Product</option>
                                <option value="data">Data Science</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-1">Job Type</label>
                            <select className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-black">
                                <option value="all">All Types</option>
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                                <option value="internship">Internship</option>
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
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job, index) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <Card className="h-full" hover>
                                    <Link to={`/recruiter/jobs/${job.id}`} className="block p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-2 bg-purple-100 rounded-full">
                                                <Briefcase size={20} className="text-purple-600" />
                                            </div>
                                            {getStatusBadge(job.status)}
                                        </div>

                                        <h3 className="text-lg font-bold text-black mb-1">{job.title}</h3>
                                        <p className="text-sm text-black mb-4">{job.department}</p>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-sm text-black">
                                                <MapPin size={16} className="mr-2" />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center text-sm text-black">
                                                <Users size={16} className="mr-2" />
                                                {job.applicants} Applicants
                                            </div>
                                            <div className="flex items-center text-sm text-black">
                                                <Calendar size={16} className="mr-2" />
                                                Deadline: {job.deadline}
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                            <span className="text-xs text-black">Posted {job.postedDate}</span>
                                            <Badge variant="primary" size="sm">
                                                {job.type}
                                            </Badge>
                                        </div>
                                    </Link>
                                </Card>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                            <div className="p-4 bg-purple-100 rounded-full mb-4">
                                <Briefcase size={32} className="text-purple-600" />
                            </div>
                            <h3 className="text-lg font-medium text-black mb-1">No jobs found</h3>
                            <p className="text-black mb-4">Try adjusting your search or filters</p>
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

export default Jobs
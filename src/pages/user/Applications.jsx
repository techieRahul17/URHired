import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, FileText, CheckCircle, XCircle, Eye, Clock, Calendar } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import ProgressBar from '../../components/ui/ProgressBar';

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setApplications([
                {
                    id: 1,
                    position: 'Senior Frontend Developer',
                    company: 'Tech Solutions Inc.',
                    logo: null,
                    location: 'Remote',
                    appliedDate: 'April 2, 2025',
                    status: 'interview',
                    matchScore: 92,
                    stages: [
                        { name: 'Application Submitted', completed: true },
                        { name: 'Resume Screening', completed: true },
                        { name: 'Technical Assessment', completed: true },
                        { name: 'Interview', completed: false },
                        { name: 'Final Decision', completed: false }
                    ]
                },
                {
                    id: 2,
                    position: 'UX/UI Designer',
                    company: 'Creative Designs',
                    logo: null,
                    location: 'San Francisco, CA',
                    appliedDate: 'March 28, 2025',
                    status: 'review',
                    matchScore: 85,
                    stages: [
                        { name: 'Application Submitted', completed: true },
                        { name: 'Resume Screening', completed: true },
                        { name: 'Portfolio Review', completed: false },
                        { name: 'Interview', completed: false },
                        { name: 'Final Decision', completed: false }
                    ]
                },
                {
                    id: 3,
                    position: 'Full Stack Developer',
                    company: 'Innovate Labs',
                    logo: null,
                    location: 'New York, NY',
                    appliedDate: 'March 25, 2025',
                    status: 'rejected',
                    matchScore: 78,
                    stages: [
                        { name: 'Application Submitted', completed: true },
                        { name: 'Resume Screening', completed: true },
                        { name: 'Technical Assessment', completed: true },
                        { name: 'Interview', completed: false },
                        { name: 'Final Decision', completed: true }
                    ]
                },
                {
                    id: 4,
                    position: 'Product Manager',
                    company: 'Tech Giants',
                    logo: null,
                    location: 'Seattle, WA',
                    appliedDate: 'March 20, 2025',
                    status: 'new',
                    matchScore: 82,
                    stages: [
                        { name: 'Application Submitted', completed: true },
                        { name: 'Resume Screening', completed: false },
                        { name: 'Case Study', completed: false },
                        { name: 'Interview', completed: false },
                        { name: 'Final Decision', completed: false }
                    ]
                },
                {
                    id: 5,
                    position: 'DevOps Engineer',
                    company: 'Cloud Systems',
                    logo: null,
                    location: 'Remote',
                    appliedDate: 'March 18, 2025',
                    status: 'review',
                    matchScore: 88,
                    stages: [
                        { name: 'Application Submitted', completed: true },
                        { name: 'Resume Screening', completed: true },
                        { name: 'Technical Assessment', completed: false },
                        { name: 'Interview', completed: false },
                        { name: 'Final Decision', completed: false }
                    ]
                }
            ]);

            setLoading(false);
        }, 1500);
    }, []);

    const filteredApplications = applications.filter(application => {
        // Filter by search term
        const matchesSearch =
            application.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.location.toLowerCase().includes(searchTerm.toLowerCase());

        // Filter by status
        const matchesStatus = filterStatus === 'all' || application.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'new':
                return <Badge variant="info">New</Badge>;
            case 'review':
                return <Badge variant="warning">Under Review</Badge>;
            case 'interview':
                return <Badge variant="primary">Interview Scheduled</Badge>;
            case 'offer':
                return <Badge variant="success">Offer Received</Badge>;
            case 'rejected':
                return <Badge variant="danger">Not Selected</Badge>;
            default:
                return null;
        }
    };

    const getApplicationProgress = (stages) => {
        const completedStages = stages.filter(stage => stage.completed).length;
        return (completedStages / stages.length) * 100;
    };

    return (
        <PageLayout title="My Applications">
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-black">
                <div className="flex-1">
                    <div className="relative">
                        <Input
                            placeholder="Search by job title, company, or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            icon={<Search size={18} />}
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                        icon={<Filter size={18} />}
                    >
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
                                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-black"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">All Statuses</option>
                                <option value="new">New</option>
                                <option value="review">Under Review</option>
                                <option value="interview">Interview Scheduled</option>
                                <option value="offer">Offer Received</option>
                                <option value="rejected">Not Selected</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date Applied</label>
                            <select
                                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-black"
                            >
                                <option value="all">All Time</option>
                                <option value="today">Today</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                                <option value="3months">Last 3 Months</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Match Score</label>
                            <select
                                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-black"
                            >
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
                <div className="space-y-6">
                    {filteredApplications.length > 0 ? (
                        filteredApplications.map((application, index) => (
                            <motion.div
                                key={application.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <Card className="overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-start">
                                            <div className="flex-shrink-0 mb-4 lg:mb-0 lg:mr-6">
                                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                                    {application.company.substring(0, 2).toUpperCase()}
                                                </div>
                                            </div>

                                            <div className="flex-grow">
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                                    <h3 className="text-xl font-bold text-gray-900">{application.position}</h3>
                                                    {getStatusBadge(application.status)}
                                                </div>

                                                <p className="text-gray-600 mb-3">{application.company} • {application.location}</p>

                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <Calendar size={16} className="mr-2 text-gray-500" />
                                                        Applied on {application.appliedDate}
                                                    </div>

                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <Badge
                                                            variant={
                                                                application.matchScore >= 90 ? 'success' :
                                                                    application.matchScore >= 80 ? 'primary' :
                                                                        application.matchScore >= 70 ? 'warning' : 'secondary'
                                                            }
                                                            size="sm"
                                                        >
                                                            {application.matchScore}% Match
                                                        </Badge>
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-sm font-medium text-gray-700">Application Progress</span>
                                                        <span className="text-sm font-medium text-gray-700">
                              {application.stages.filter(stage => stage.completed).length}/{application.stages.length} Steps
                            </span>
                                                    </div>
                                                    <ProgressBar
                                                        value={getApplicationProgress(application.stages)}
                                                        max={100}
                                                        showValue={false}
                                                        color={
                                                            application.status === 'rejected' ? 'danger' :
                                                                application.status === 'offer' ? 'success' : 'primary'
                                                        }
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
                                                    {application.stages.map((stage, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={`flex flex-col items-center p-2 rounded-md text-center ${
                                                                stage.completed
                                                                    ? 'bg-purple-100 text-purple-800'
                                                                    : application.status === 'rejected'
                                                                        ? 'bg-gray-100 text-gray-400'
                                                                        : 'bg-gray-100 text-gray-600'
                                                            }`}
                                                        >
                                                            {stage.completed ? (
                                                                <CheckCircle size={16} className="mb-1 text-green-500" />
                                                            ) : application.status === 'rejected' ? (
                                                                <XCircle size={16} className="mb-1 text-gray-400" />
                                                            ) : (
                                                                <Clock size={16} className="mb-1 text-gray-500" />
                                                            )}
                                                            <span className="text-xs">{stage.name}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100">
                                                    {application.status === 'interview' && (
                                                        <span className="text-sm text-purple-600 font-medium mb-2 sm:mb-0">
                              Interview scheduled for April 8, 2025 at 2:00 PM
                            </span>
                                                    )}

                                                    {application.status === 'rejected' && (
                                                        <span className="text-sm text-gray-500 mb-2 sm:mb-0">
                              Thank you for your interest. We've decided to move forward with other candidates.
                            </span>
                                                    )}

                                                    {(application.status !== 'interview' && application.status !== 'rejected') && (
                                                        <span className="text-sm text-gray-500 mb-2 sm:mb-0">
                              We'll notify you when there's an update on your application.
                            </span>
                                                    )}

                                                    <div className="flex space-x-3">
                                                        <Button variant="outline" size="sm" icon={<Eye size={16} />}>
                                                            View Details
                                                        </Button>

                                                        {application.status === 'interview' && (
                                                            <Button variant="primary" size="sm">
                                                                Prepare for Interview
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="p-4 bg-purple-100 rounded-full mb-4">
                                <FileText size={32} className="text-purple-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">No applications found</h3>
                            <p className="text-gray-500 mb-4">You haven't applied to any jobs yet</p>
                            <Button variant="primary" size="sm">
                                Browse Jobs
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </PageLayout>
    );
};

export default Applications;



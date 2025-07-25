import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, MapPin, User, Search, Filter, ChevronDown, CheckCircle, XCircle, Phone } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Avatar from '../../components/ui/Avatar';

const Interviews = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setInterviews([
                {
                    id: 1,
                    position: 'Senior Frontend Developer',
                    company: 'Tech Solutions Inc.',
                    logo: null,
                    interviewer: { name: 'Sarah Johnson', title: 'Tech Lead' },
                    date: 'Today',
                    time: '2:00 PM - 3:00 PM',
                    type: 'technical',
                    format: 'video',
                    status: 'scheduled',
                    notes: 'Prepare to discuss React, TypeScript, and system design. Be ready to share your screen for a coding exercise.',
                    joinUrl: '#'
                },
                {
                    id: 2,
                    position: 'UX/UI Designer',
                    company: 'Creative Designs',
                    logo: null,
                    interviewer: { name: 'Michael Chen', title: 'Design Director' },
                    date: 'Tomorrow',
                    time: '10:00 AM - 11:00 AM',
                    type: 'initial',
                    format: 'video',
                    status: 'scheduled',
                    notes: 'Be prepared to walk through your portfolio and discuss your design process.',
                    joinUrl: '#'
                },
                {
                    id: 3,
                    position: 'Product Manager',
                    company: 'Tech Giants',
                    logo: null,
                    interviewer: { name: 'Emily Brown', title: 'Senior PM' },
                    date: 'Apr 10, 2025',
                    time: '1:00 PM - 2:00 PM',
                    type: 'initial',
                    format: 'phone',
                    status: 'scheduled',
                    notes: 'Prepare to discuss your experience with product development and user research.',
                    joinUrl: '#'
                },
                {
                    id: 4,
                    position: 'DevOps Engineer',
                    company: 'Cloud Systems',
                    logo: null,
                    interviewer: { name: 'David Wilson', title: 'CTO' },
                    date: 'Apr 3, 2025',
                    time: '11:00 AM - 12:00 PM',
                    type: 'technical',
                    format: 'video',
                    status: 'completed',
                    notes: 'Discussed CI/CD pipelines, Kubernetes, and cloud infrastructure.',
                    joinUrl: '#'
                },
                {
                    id: 5,
                    position: 'Full Stack Developer',
                    company: 'Innovate Labs',
                    logo: null,
                    interviewer: { name: 'Alex Rodriguez', title: 'Engineering Manager' },
                    date: 'Mar 28, 2025',
                    time: '2:30 PM - 3:30 PM',
                    type: 'technical',
                    format: 'in-person',
                    status: 'cancelled',
                    notes: 'Interview was cancelled by the company. They will reschedule soon.',
                    joinUrl: '#'
                }
            ]);

            setLoading(false);
        }, 1500);
    }, []);

    const filteredInterviews = interviews.filter(interview => {
        // Filter by search term
        const matchesSearch =
            interview.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
            interview.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            interview.interviewer.name.toLowerCase().includes(searchTerm.toLowerCase());

        // Filter by status
        const matchesStatus = filterStatus === 'all' || interview.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'scheduled':
                return <Badge variant="primary">Scheduled</Badge>;
            case 'completed':
                return <Badge variant="success">Completed</Badge>;
            case 'cancelled':
                return <Badge variant="danger">Cancelled</Badge>;
            default:
                return null;
        }
    };

    const getTypeBadge = (type) => {
        switch (type) {
            case 'initial':
                return <Badge variant="info" size="sm">Initial Screening</Badge>;
            case 'technical':
                return <Badge variant="warning" size="sm">Technical</Badge>;
            case 'final':
                return <Badge variant="success" size="sm">Final</Badge>;
            default:
                return null;
        }
    };

    const getFormatIcon = (format) => {
        switch (format) {
            case 'video':
                return <Video size={16} className="text-blue-500" />;
            case 'in-person':
                return <MapPin size={16} className="text-green-500" />;
            case 'phone':
                return <Phone size={16} className="text-purple-500" />;
            default:
                return null;
        }
    };

    return (
        <PageLayout title="My Interviews">
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-black">
                <div className="flex-1">
                    <div className="relative">
                        <Input
                            placeholder="Search by job title, company, or interviewer..."
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
                                <option value="all">All Status</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Interview Type</label>
                            <select
                                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-black"
                            >
                                <option value="all">All Types</option>
                                <option value="initial">Initial Screening</option>
                                <option value="technical">Technical</option>
                                <option value="final">Final</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                            <select
                                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-black"
                            >
                                <option value="all">All Formats</option>
                                <option value="video">Video</option>
                                <option value="in-person">In-person</option>
                                <option value="phone">Phone</option>
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
                                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                                                {interview.company.substring(0, 2).toUpperCase()}
                                            </div>
                                            {getStatusBadge(interview.status)}
                                        </div>

                                        <h3 className="font-bold text-gray-900 mb-1">{interview.position}</h3>
                                        <p className="text-sm text-gray-600 mb-4">{interview.company}</p>

                                        <div className="space-y-3 mb-4">
                                            <div className="flex items-center text-sm text-black">
                                                <Calendar size={16} className="mr-2 text-gray-500" />
                                                <span>{interview.date}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-black">
                                                <Clock size={16} className="mr-2 text-gray-500" />
                                                <span>{interview.time}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-black">
                                                {getFormatIcon(interview.format)}
                                                <span className="ml-2 capitalize">{interview.format} Interview</span>
                                            </div>
                                            <div className="flex items-center text-sm text-black">
                                                <User size={16} className="mr-2 text-gray-500" />
                                                <span>{interview.interviewer.name} ({interview.interviewer.title})</span>
                                            </div>
                                        </div>

                                        {interview.notes && (
                                            <div className="mb-4 p-3 bg-gray-50 rounded-md text-sm text-gray-700">
                                                <p className="font-medium mb-1">Notes:</p>
                                                <p>{interview.notes}</p>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div>
                                                {getTypeBadge(interview.type)}
                                            </div>

                                            <div className="flex space-x-2">
                                                {interview.status === 'scheduled' && (
                                                    <Button variant="primary" size="sm">
                                                        Join Interview
                                                    </Button>
                                                )}
                                                {interview.status === 'completed' && (
                                                    <Button variant="outline" size="sm">
                                                        View Feedback
                                                    </Button>
                                                )}
                                                {interview.status === 'cancelled' && (
                                                    <Button variant="outline" size="sm">
                                                        Contact Recruiter
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
                            <p className="text-gray-500 mb-4">You don't have any interviews scheduled yet</p>
                            <Button variant="outline" size="sm" onClick={() => {
                                setSearchTerm('');
                                setFilterStatus('all');
                            }}>
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </PageLayout>
    );
};

export default Interviews;

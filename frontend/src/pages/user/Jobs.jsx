import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, Briefcase, MapPin, DollarSign, Clock, BookmarkPlus } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        jobType: 'all',
        location: 'all',
        experience: 'all'
    });

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setJobs([
                {
                    id: 1,
                    title: 'Senior Frontend Developer',
                    company: 'Tech Solutions Inc.',
                    logo: null,
                    location: 'Remote',
                    type: 'Full-time',
                    salary: '$120,000 - $150,000',
                    experience: '5+ years',
                    postedDate: '2 days ago',
                    matchScore: 95,
                    description: 'We are looking for a Senior Frontend Developer to join our engineering team. You will be responsible for building and maintaining our web applications.'
                },
                {
                    id: 2,
                    title: 'Machine Learning Engineer',
                    company: 'Data Innovations',
                    logo: null,
                    location: 'New York, NY',
                    type: 'Full-time',
                    salary: '$130,000 - $160,000',
                    experience: '3-5 years',
                    postedDate: '3 days ago',
                    matchScore: 88,
                    description: 'Join our AI team to develop and implement machine learning models and algorithms for our cutting-edge products.'
                },
                {
                    id: 3,
                    title: 'UX/UI Designer',
                    company: 'Creative Designs',
                    logo: null,
                    location: 'San Francisco, CA',
                    type: 'Full-time',
                    salary: '$100,000 - $130,000',
                    experience: '3+ years',
                    postedDate: '5 days ago',
                    matchScore: 82,
                    description: 'We are seeking a talented UX/UI Designer to create amazing user experiences for our digital products.'
                },
                {
                    id: 4,
                    title: 'DevOps Engineer',
                    company: 'Cloud Systems',
                    logo: null,
                    location: 'Remote',
                    type: 'Full-time',
                    salary: '$110,000 - $140,000',
                    experience: '4+ years',
                    postedDate: '1 week ago',
                    matchScore: 79,
                    description: 'Looking for a DevOps Engineer to help us build and maintain our cloud infrastructure and CI/CD pipelines.'
                },
                {
                    id: 5,
                    title: 'Product Manager',
                    company: 'Innovate Inc.',
                    logo: null,
                    location: 'Austin, TX',
                    type: 'Full-time',
                    salary: '$125,000 - $155,000',
                    experience: '5+ years',
                    postedDate: '1 week ago',
                    matchScore: 75,
                    description: 'Join our product team to lead the development of innovative software products from conception to launch.'
                },
                {
                    id: 6,
                    title: 'Frontend Developer (React)',
                    company: 'Web Solutions',
                    logo: null,
                    location: 'Chicago, IL',
                    type: 'Contract',
                    salary: '$90,000 - $110,000',
                    experience: '2-4 years',
                    postedDate: '2 weeks ago',
                    matchScore: 92,
                    description: 'We need a skilled React developer to help us build modern, responsive web applications for our clients.'
                }
            ]);

            setLoading(false);
        }, 1500);
    }, []);

    const filteredJobs = jobs.filter(job => {
        // Filter by search term
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase());

        // Filter by job type
        const matchesJobType = filters.jobType === 'all' || job.type.toLowerCase().includes(filters.jobType.toLowerCase());

        // Filter by location
        const matchesLocation = filters.location === 'all' ||
            (filters.location === 'remote' && job.location.toLowerCase() === 'remote') ||
            (filters.location !== 'remote' && job.location.toLowerCase().includes(filters.location.toLowerCase()));

        // Filter by experience
        let matchesExperience = true;
        if (filters.experience !== 'all') {
            const expYears = parseInt(job.experience);
            if (filters.experience === 'entry' && expYears > 2) matchesExperience = false;
            if (filters.experience === 'mid' && (expYears < 2 || expYears > 5)) matchesExperience = false;
            if (filters.experience === 'senior' && expYears < 5) matchesExperience = false;
        }

        return matchesSearch && matchesJobType && matchesLocation && matchesExperience;
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <PageLayout title="Browse Jobs">
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-black">
                <div className="flex-1 text-black mt-4">
                    <div className="relative">
                        <Input
                            placeholder="Search jobs by title, company, location, or keywords..."
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

                    <Button
                        variant="primary"
                        icon={<BookmarkPlus size={18} />}
                    >
                        Saved Jobs
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
                            <label className="block text-sm font-medium text-black mb-1">Job Type</label>
                            <select
                                name="jobType"
                                className="w-full rounded-md border border-black p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-black"
                                value={filters.jobType}
                                onChange={handleFilterChange}
                            >
                                <option value="all">All Types</option>
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                                <option value="internship">Internship</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <select
                                name="location"
                                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-black"
                                value={filters.location}
                                onChange={handleFilterChange}
                            >
                                <option value="all">All Locations</option>
                                <option value="remote">Remote</option>
                                <option value="new york">New York</option>
                                <option value="san francisco">San Francisco</option>
                                <option value="austin">Austin</option>
                                <option value="chicago">Chicago</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                            <select
                                name="experience"
                                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-black"
                                value={filters.experience}
                                onChange={handleFilterChange}
                            >
                                <option value="all">All Levels</option>
                                <option value="entry">Entry Level (0-2 years)</option>
                                <option value="mid">Mid Level (2-5 years)</option>
                                <option value="senior">Senior Level (5+ years)</option>
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
                <>
                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-700">
                            {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
                        </h3>
                    </div>

                    <div className="space-y-6">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job, index) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <Card className="overflow-hidden">
                                        <div className="p-6">
                                            <div className="flex flex-col md:flex-row md:items-start">
                                                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                                        {job.company.substring(0, 2).toUpperCase()}
                                                    </div>
                                                </div>

                                                <div className="flex-grow">
                                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                                        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                                                        <Badge
                                                            variant={
                                                                job.matchScore >= 90 ? 'success' :
                                                                    job.matchScore >= 80 ? 'primary' :
                                                                        job.matchScore >= 70 ? 'warning' : 'secondary'
                                                            }
                                                            className="mt-2 md:mt-0"
                                                        >
                                                            {job.matchScore}% Match
                                                        </Badge>
                                                    </div>

                                                    <p className="text-gray-600 mb-3">{job.company}</p>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-4 mb-4">
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <MapPin size={16} className="mr-2 text-gray-500" />
                                                            {job.location}
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <Briefcase size={16} className="mr-2 text-gray-500" />
                                                            {job.type}
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <DollarSign size={16} className="mr-2 text-gray-500" />
                                                            {job.salary}
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <Clock size={16} className="mr-2 text-gray-500" />
                                                            {job.experience}
                                                        </div>
                                                    </div>

                                                    <p className="text-gray-700 mb-4">{job.description}</p>

                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100">
                                                        <span className="text-sm text-gray-500 mb-2 sm:mb-0">Posted {job.postedDate}</span>

                                                        <div className="flex space-x-3">
                                                            <Button variant="outline" size="sm" icon={<BookmarkPlus size={16} />}>
                                                                Save
                                                            </Button>
                                                            <Button variant="primary" size="sm">
                                                                Apply Now
                                                            </Button>
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
                                    <Briefcase size={32} className="text-purple-600" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-1">No jobs found</h3>
                                <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                                <Button variant="outline" size="sm" onClick={() => {
                                    setSearchTerm('');
                                    setFilters({
                                        jobType: 'all',
                                        location: 'all',
                                        experience: 'all'
                                    });
                                }}>
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </PageLayout>
    );
};

export default Jobs;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Search, Filter, ChevronDown, Plus, Download, Mail, Phone, 
    Star, StarOff, Eye, MessageSquare, Calendar, Clock, 
    CheckCircle, XCircle, AlertCircle, Users, Briefcase,
    FileText, Globe, MapPin, GraduationCap, Award, Zap,
    MoreVertical, Archive, Trash2, UserCheck, UserX,
    TrendingUp, BarChart3, PieChart
} from "lucide-react";

// Mock components for demonstration purposes
const PageLayout = ({ title, subtitle, children }) => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8 font-sans">
        <div className="max-w-7xl mx-auto">
            <header className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {title}
                        </h1>
                        <p className="text-lg text-slate-600 mt-1">{subtitle}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
                            <div className="flex items-center gap-2">
                                <TrendingUp size={16} className="text-green-500" />
                                <span className="text-sm font-medium">+12% this week</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main>{children}</main>
        </div>
    </div>
);

const Card = ({ children, className, onClick }) => (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-slate-200 overflow-hidden ${className}`} onClick={onClick}>
        {children}
    </div>
);

const Button = ({ variant, size, icon, onClick, children, disabled, href, target = "_blank", rel = "noopener noreferrer" }) => {
    let baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    let variantStyles = "";
    let sizeStyles = "";

    switch (variant) {
        case "primary":
            variantStyles = "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500 shadow-lg hover:shadow-xl";
            break;
        case "secondary":
            variantStyles = "bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-500";
            break;
        case "outline":
            variantStyles = "border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-blue-500";
            break;
        case "success":
            variantStyles = "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 focus:ring-green-400 shadow-lg";
            break;
        case "danger":
            variantStyles = "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 focus:ring-red-400 shadow-lg";
            break;
        case "warning":
            variantStyles = "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 focus:ring-yellow-400 shadow-lg";
            break;
        case "ghost":
            variantStyles = "text-slate-600 hover:bg-slate-100 focus:ring-slate-500";
            break;
        default:
            variantStyles = "bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-400";
    }

    switch (size) {
        case "xs":
            sizeStyles = "px-2 py-1 text-xs";
            break;
        case "sm":
            sizeStyles = "px-3 py-1.5 text-sm";
            break;
        case "md":
            sizeStyles = "px-4 py-2 text-base";
            break;
        case "lg":
            sizeStyles = "px-6 py-3 text-lg";
            break;
        default:
            sizeStyles = "px-4 py-2 text-base";
    }

    const commonProps = { 
        className: `${baseStyles} ${variantStyles} ${sizeStyles}`,
        disabled 
    };

    if (href) {
        return (
            <a href={href} target={target} rel={rel} {...commonProps}>
                {icon && <span className={children ? "mr-2" : ""}>{icon}</span>}
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} {...commonProps}>
            {icon && <span className={children ? "mr-2" : ""}>{icon}</span>}
            {children}
        </button>
    );
};

const Badge = ({ variant, size, children, icon }) => {
    let baseStyles = "inline-flex items-center rounded-full font-medium transition-colors";
    let variantStyles = "";
    let sizeStyles = "";

    switch (variant) {
        case "primary":
            variantStyles = "bg-blue-100 text-blue-800 border border-blue-200";
            break;
        case "success":
            variantStyles = "bg-green-100 text-green-800 border border-green-200";
            break;
        case "danger":
            variantStyles = "bg-red-100 text-red-800 border border-red-200";
            break;
        case "warning":
            variantStyles = "bg-yellow-100 text-yellow-800 border border-yellow-200";
            break;
        case "info":
            variantStyles = "bg-cyan-100 text-cyan-800 border border-cyan-200";
            break;
        case "purple":
            variantStyles = "bg-purple-100 text-purple-800 border border-purple-200";
            break;
        default:
            variantStyles = "bg-slate-100 text-slate-800 border border-slate-200";
    }

    switch (size) {
        case "sm":
            sizeStyles = "px-2 py-0.5 text-xs";
            break;
        case "md":
            sizeStyles = "px-2.5 py-1 text-sm";
            break;
        default:
            sizeStyles = "px-2.5 py-1 text-sm";
    }

    return (
        <span className={`${baseStyles} ${variantStyles} ${sizeStyles}`}>
            {icon && <span className="mr-1">{icon}</span>}
            {children}
        </span>
    );
};

const Input = ({ placeholder, value, onChange, icon, type = "text" }) => (
    <div className="relative">
        {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                {icon}
            </div>
        )}
        <input
            type={type}
            className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${icon ? "pl-10" : ""}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    </div>
);

const Avatar = ({ src, alt, size, online }) => {
    let sizeClasses = "";
    switch (size) {
        case "xs":
            sizeClasses = "h-6 w-6 text-xs";
            break;
        case "sm":
            sizeClasses = "h-8 w-8 text-sm";
            break;
        case "md":
            sizeClasses = "h-10 w-10 text-base";
            break;
        case "lg":
            sizeClasses = "h-12 w-12 text-lg";
            break;
        case "xl":
            sizeClasses = "h-16 w-16 text-xl";
            break;
        default:
            sizeClasses = "h-10 w-10 text-base";
    }

    return (
        <div className={`relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold flex-shrink-0 ${sizeClasses}`}>
            {src ? (
                <img className="h-full w-full rounded-full object-cover" src={src} alt={alt} />
            ) : (
                <span className="leading-none">{alt ? alt.charAt(0).toUpperCase() : "?"}</span>
            )}
            {online && (
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></div>
            )}
        </div>
    );
};

const ProgressBar = ({ percentage, color = "blue" }) => {
    const colorMap = {
        blue: "bg-blue-500",
        green: "bg-green-500",
        yellow: "bg-yellow-500",
        red: "bg-red-500",
        purple: "bg-purple-500"
    };

    return (
        <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
                className={`h-2 rounded-full transition-all duration-300 ${colorMap[color]}`}
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedApplications, setSelectedApplications] = useState([]);
    const [viewMode, setViewMode] = useState("grid"); // grid or list
    const [showFilters, setShowFilters] = useState(false);
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterExperience, setFilterExperience] = useState("all");
    const [filterLocation, setFilterLocation] = useState("all");
    const [filterSkills, setFilterSkills] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [showBulkActions, setShowBulkActions] = useState(false);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setApplications([
                {
                    id: 1,
                    candidate: {
                        name: "Sarah Chen",
                        email: "sarah.chen@email.com",
                        phone: "+1 (555) 123-4567",
                        avatar: null,
                        location: "San Francisco, CA",
                        experience: "5-7 years",
                        education: "MS Computer Science, Stanford",
                        linkedIn: "https://linkedin.com/in/sarahchen"
                    },
                    job: {
                        title: "Senior Full Stack Developer",
                        department: "Engineering",
                        type: "Full-time",
                        remote: true
                    },
                    status: "in_review",
                    applicationDate: "2025-07-20",
                    lastActivity: "2025-07-23",
                    rating: 4.5,
                    tags: ["React", "Node.js", "AWS", "TypeScript"],
                    resumeUrl: "#",
                    coverLetterUrl: "#",
                    portfolioUrl: "https://sarahchen.dev",
                    salary: "$120,000 - $140,000",
                    availability: "2 weeks notice",
                    notes: "Strong technical background, excellent communication skills",
                    priority: "high",
                    source: "LinkedIn"
                },
                {
                    id: 2,
                    candidate: {
                        name: "Marcus Johnson",
                        email: "marcus.j@email.com",
                        phone: "+1 (555) 987-6543",
                        avatar: null,
                        location: "New York, NY",
                        experience: "3-5 years",
                        education: "BS Software Engineering, MIT",
                        linkedIn: "https://linkedin.com/in/marcusj"
                    },
                    job: {
                        title: "UX/UI Designer",
                        department: "Design",
                        type: "Full-time",
                        remote: false
                    },
                    status: "shortlisted",
                    applicationDate: "2025-07-18",
                    lastActivity: "2025-07-24",
                    rating: 4.8,
                    tags: ["Figma", "Sketch", "Prototyping", "User Research"],
                    resumeUrl: "#",
                    coverLetterUrl: "#",
                    portfolioUrl: "https://marcusdesign.co",
                    salary: "$85,000 - $100,000",
                    availability: "Immediate",
                    notes: "Outstanding portfolio, great design thinking",
                    priority: "high",
                    source: "Company website"
                },
                {
                    id: 3,
                    candidate: {
                        name: "Elena Rodriguez",
                        email: "elena.rodriguez@email.com",
                        phone: "+1 (555) 456-7890",
                        avatar: null,
                        location: "Austin, TX",
                        experience: "8+ years",
                        education: "PhD Data Science, UT Austin",
                        linkedIn: "https://linkedin.com/in/elenarodriguez"
                    },
                    job: {
                        title: "Data Science Manager",
                        department: "Data",
                        type: "Full-time",
                        remote: true
                    },
                    status: "interview_scheduled",
                    applicationDate: "2025-07-15",
                    lastActivity: "2025-07-25",
                    rating: 4.9,
                    tags: ["Python", "Machine Learning", "Leadership", "Statistics"],
                    resumeUrl: "#",
                    coverLetterUrl: "#",
                    portfolioUrl: null,
                    salary: "$150,000 - $180,000",
                    availability: "1 month notice",
                    notes: "Exceptional leader with strong technical skills",
                    priority: "high",
                    source: "Referral"
                },
                {
                    id: 4,
                    candidate: {
                        name: "David Kim",
                        email: "david.kim@email.com",
                        phone: "+1 (555) 321-9876",
                        avatar: null,
                        location: "Seattle, WA",
                        experience: "2-3 years",
                        education: "BS Marketing, University of Washington",
                        linkedIn: "https://linkedin.com/in/davidkim"
                    },
                    job: {
                        title: "Product Marketing Manager",
                        department: "Marketing",
                        type: "Full-time",
                        remote: true
                    },
                    status: "new",
                    applicationDate: "2025-07-24",
                    lastActivity: "2025-07-24",
                    rating: 3.8,
                    tags: ["Growth Marketing", "Analytics", "B2B", "SaaS"],
                    resumeUrl: "#",
                    coverLetterUrl: "#",
                    portfolioUrl: null,
                    salary: "$70,000 - $85,000",
                    availability: "3 weeks notice",
                    notes: "Good growth marketing experience",
                    priority: "medium",
                    source: "Indeed"
                },
                {
                    id: 5,
                    candidate: {
                        name: "Priya Patel",
                        email: "priya.patel@email.com",
                        phone: "+1 (555) 654-3210",
                        avatar: null,
                        location: "Boston, MA",
                        experience: "5-7 years",
                        education: "MBA Finance, Harvard",
                        linkedIn: "https://linkedin.com/in/priyapatel"
                    },
                    job: {
                        title: "Senior Financial Analyst",
                        department: "Finance",
                        type: "Full-time",
                        remote: false
                    },
                    status: "rejected",
                    applicationDate: "2025-07-10",
                    lastActivity: "2025-07-22",
                    rating: 3.2,
                    tags: ["Excel", "Financial Modeling", "SQL", "Tableau"],
                    resumeUrl: "#",
                    coverLetterUrl: "#",
                    portfolioUrl: null,
                    salary: "$95,000 - $110,000",
                    availability: "2 weeks notice",
                    notes: "Good financial background but lacks industry experience",
                    priority: "low",
                    source: "Glassdoor"
                },
                {
                    id: 6,
                    candidate: {
                        name: "Alex Thompson",
                        email: "alex.thompson@email.com",
                        phone: "+1 (555) 789-0123",
                        avatar: null,
                        location: "Denver, CO",
                        experience: "1-2 years",
                        education: "BS Computer Science, Colorado State",
                        linkedIn: "https://linkedin.com/in/alexthompson"
                    },
                    job: {
                        title: "Junior Software Engineer",
                        department: "Engineering",
                        type: "Full-time",
                        remote: true
                    },
                    status: "hired",
                    applicationDate: "2025-07-05",
                    lastActivity: "2025-07-25",
                    rating: 4.3,
                    tags: ["JavaScript", "React", "Git", "Node.js"],
                    resumeUrl: "#",
                    coverLetterUrl: "#",
                    portfolioUrl: "https://alexdev.com",
                    salary: "$65,000 - $75,000",
                    availability: "Immediate",
                    notes: "Great potential, quick learner",
                    priority: "medium",
                    source: "University career fair"
                }
            ]);
            setLoading(false);
        }, 1500);
    }, []);

    const getStatusInfo = (status) => {
        const statusMap = {
            new: { label: "New", variant: "info", icon: <Plus size={12} /> },
            in_review: { label: "In Review", variant: "warning", icon: <Eye size={12} /> },
            shortlisted: { label: "Shortlisted", variant: "purple", icon: <Star size={12} /> },
            interview_scheduled: { label: "Interview Scheduled", variant: "primary", icon: <Calendar size={12} /> },
            hired: { label: "Hired", variant: "success", icon: <CheckCircle size={12} /> },
            rejected: { label: "Rejected", variant: "danger", icon: <XCircle size={12} /> }
        };
        return statusMap[status] || statusMap.new;
    };

    const getPriorityColor = (priority) => {
        const colorMap = {
            high: "text-red-500",
            medium: "text-yellow-500",
            low: "text-green-500"
        };
        return colorMap[priority] || colorMap.medium;
    };

    const filteredApplications = applications.filter((app) => {
        const matchesSearch = 
            app.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = filterStatus === "all" || app.status === filterStatus;
        const matchesExperience = filterExperience === "all" || app.candidate.experience === filterExperience;
        const matchesLocation = filterLocation === "all" || app.candidate.location.includes(filterLocation);
        const matchesSkills = filterSkills === "all" || app.tags.some(tag => tag.toLowerCase().includes(filterSkills.toLowerCase()));

        return matchesSearch && matchesStatus && matchesExperience && matchesLocation && matchesSkills;
    });

    const sortedApplications = [...filteredApplications].sort((a, b) => {
        switch (sortBy) {
            case "newest":
                return new Date(b.applicationDate) - new Date(a.applicationDate);
            case "oldest":
                return new Date(a.applicationDate) - new Date(b.applicationDate);
            case "rating":
                return b.rating - a.rating;
            case "name":
                return a.candidate.name.localeCompare(b.candidate.name);
            case "priority":
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            default:
                return 0;
        }
    });

    const handleSelectApplication = (appId) => {
        setSelectedApplications(prev => 
            prev.includes(appId) 
                ? prev.filter(id => id !== appId)
                : [...prev, appId]
        );
    };

    const handleSelectAll = () => {
        if (selectedApplications.length === sortedApplications.length) {
            setSelectedApplications([]);
        } else {
            setSelectedApplications(sortedApplications.map(app => app.id));
        }
    };

    const handleBulkAction = (action) => {
        console.log(`Bulk action: ${action} on applications:`, selectedApplications);
        setSelectedApplications([]);
        setShowBulkActions(false);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setFilterStatus("all");
        setFilterExperience("all");
        setFilterLocation("all");
        setFilterSkills("all");
    };

    const getApplicationStats = () => {
        const total = applications.length;
        const new_apps = applications.filter(app => app.status === "new").length;
        const in_review = applications.filter(app => app.status === "in_review").length;
        const shortlisted = applications.filter(app => app.status === "shortlisted").length;
        const hired = applications.filter(app => app.status === "hired").length;
        
        return { total, new_apps, in_review, shortlisted, hired };
    };

    const stats = getApplicationStats();

    return (
        <PageLayout title="Applications" subtitle="Talent Acquisition Dashboard">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-600">Total Applications</p>
                            <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Users size={24} className="text-blue-600" />
                        </div>
                    </div>
                </Card>
                
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-600">New</p>
                            <p className="text-3xl font-bold text-cyan-600">{stats.new_apps}</p>
                        </div>
                        <div className="p-3 bg-cyan-100 rounded-full">
                            <Plus size={24} className="text-cyan-600" />
                        </div>
                    </div>
                </Card>
                
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-600">In Review</p>
                            <p className="text-3xl font-bold text-yellow-600">{stats.in_review}</p>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded-full">
                            <Eye size={24} className="text-yellow-600" />
                        </div>
                    </div>
                </Card>
                
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-600">Shortlisted</p>
                            <p className="text-3xl font-bold text-purple-600">{stats.shortlisted}</p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-full">
                            <Star size={24} className="text-purple-600" />
                        </div>
                    </div>
                </Card>
                
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-600">Hired</p>
                            <p className="text-3xl font-bold text-green-600">{stats.hired}</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-full">
                            <CheckCircle size={24} className="text-green-600" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Search and Controls */}
            <div className="mb-6 space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 max-w-md">
                        <Input
                            placeholder="Search candidates, positions, skills..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            icon={<Search size={20} />}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <select
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="rating">Highest Rated</option>
                            <option value="name">Name A-Z</option>
                            <option value="priority">Priority</option>
                        </select>

                        <Button
                            variant="outline"
                            onClick={() => setShowFilters(!showFilters)}
                            icon={<Filter size={18} />}
                        >
                            Filters
                            <ChevronDown
                                size={16}
                                className={`ml-1 transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`}
                            />
                        </Button>

                        <Button variant="outline" icon={<Download size={18} />}>
                            Export
                        </Button>

                        <Button variant="primary" icon={<Plus size={18} />}>
                            Post Job
                        </Button>
                    </div>
                </div>

                {/* Bulk Actions */}
                {selectedApplications.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-blue-900">
                                    {selectedApplications.length} application{selectedApplications.length !== 1 ? 's' : ''} selected
                                </span>
                                <Button size="sm" variant="ghost" onClick={() => setSelectedApplications([])}>
                                    Clear
                                </Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleBulkAction('shortlist')} icon={<Star size={16} />}>
                                    Shortlist
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleBulkAction('schedule')} icon={<Calendar size={16} />}>
                                    Schedule
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleBulkAction('reject')} icon={<XCircle size={16} />}>
                                    Reject
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleBulkAction('archive')} icon={<Archive size={16} />}>
                                    Archive
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Advanced Filters */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                                    <select
                                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                    >
                                        <option value="all">All Statuses</option>
                                        <option value="new">New</option>
                                        <option value="in_review">In Review</option>
                                        <option value="shortlisted">Shortlisted</option>
                                        <option value="interview_scheduled">Interview Scheduled</option>
                                        <option value="hired">Hired</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Experience</label>
                                    <select
                                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={filterExperience}
                                        onChange={(e) => setFilterExperience(e.target.value)}
                                    >
                                        <option value="all">All Experience</option>
                                        <option value="1-2 years">1-2 years</option>
                                        <option value="2-3 years">2-3 years</option>
                                        <option value="3-5 years">3-5 years</option>
                                        <option value="5-7 years">5-7 years</option>
                                        <option value="8+ years">8+ years</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                                    <select
                                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={filterLocation}
                                        onChange={(e) => setFilterLocation(e.target.value)}
                                    >
                                        <option value="all">All Locations</option>
                                        <option value="San Francisco">San Francisco</option>
                                        <option value="New York">New York</option>
                                        <option value="Austin">Austin</option>
                                        <option value="Seattle">Seattle</option>
                                        <option value="Boston">Boston</option>
                                        <option value="Denver">Denver</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Skills</label>
                                    <Input
                                        placeholder="Filter by skills..."
                                        value={filterSkills}
                                        onChange={(e) => setFilterSkills(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center">
                                <p className="text-sm text-slate-600">
                                    Showing {sortedApplications.length} of {applications.length} applications
                                </p>
                                <Button variant="outline" size="sm" onClick={clearFilters}>
                                    Clear All Filters
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Applications Grid */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                        <div className="absolute inset-0 rounded-full border-2 border-blue-100"></div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {sortedApplications.length > 0 ? (
                        sortedApplications.map((application, index) => {
                            const statusInfo = getStatusInfo(application.status);
                            const isSelected = selectedApplications.includes(application.id);
                            
                            return (
                                <motion.div
                                    key={application.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    whileHover={{ y: -4 }}
                                >
                                    <Card className={`h-full cursor-pointer group relative ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}>
                                        {/* Selection Checkbox */}
                                        <div className="absolute top-4 left-4 z-10">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => handleSelectApplication(application.id)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </div>

                                        {/* Priority Indicator */}
                                        <div className="absolute top-4 right-4">
                                            <div className={`h-3 w-3 rounded-full ${
                                                application.priority === 'high' ? 'bg-red-400' :
                                                application.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                                            }`}></div>
                                        </div>

                                        <div className="p-6 pt-12">
                                            {/* Candidate Header */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center space-x-3">
                                                    <Avatar 
                                                        src={application.candidate.avatar} 
                                                        alt={application.candidate.name} 
                                                        size="lg" 
                                                    />
                                                    <div>
                                                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                                                            {application.candidate.name}
                                                        </h3>
                                                        <p className="text-sm text-slate-600">{application.candidate.email}</p>
                                                        <div className="flex items-center text-xs text-slate-500 mt-1">
                                                            <MapPin size={12} className="mr-1" />
                                                            {application.candidate.location}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center space-x-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={14}
                                                            className={`${
                                                                i < Math.floor(application.rating)
                                                                    ? 'text-yellow-400 fill-current'
                                                                    : 'text-slate-300'
                                                            }`}
                                                        />
                                                    ))}
                                                    <span className="text-sm font-medium text-slate-600 ml-1">
                                                        {application.rating}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Job Info */}
                                            <div className="mb-4">
                                                <h4 className="font-semibold text-slate-900">{application.job.title}</h4>
                                                <div className="flex items-center text-sm text-slate-600 mt-1">
                                                    <Briefcase size={12} className="mr-1" />
                                                    {application.job.department} • {application.job.type}
                                                    {application.job.remote && (
                                                        <Badge variant="info" size="sm" className="ml-2">Remote</Badge>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Status and Priority */}
                                            <div className="flex items-center justify-between mb-4">
                                                <Badge variant={statusInfo.variant} icon={statusInfo.icon}>
                                                    {statusInfo.label}
                                                </Badge>
                                                <span className={`text-xs font-medium ${getPriorityColor(application.priority)}`}>
                                                    {application.priority.toUpperCase()} PRIORITY
                                                </span>
                                            </div>

                                            {/* Skills Tags */}
                                            <div className="mb-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {application.tags.slice(0, 3).map((tag) => (
                                                        <Badge key={tag} variant="secondary" size="sm">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                    {application.tags.length > 3 && (
                                                        <Badge variant="secondary" size="sm">
                                                            +{application.tags.length - 3} more
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Experience and Education */}
                                            <div className="mb-4 space-y-2">
                                                <div className="flex items-center text-sm text-slate-600">
                                                    <Briefcase size={12} className="mr-2" />
                                                    <span>{application.candidate.experience}</span>
                                                </div>
                                                <div className="flex items-center text-sm text-slate-600">
                                                    <GraduationCap size={12} className="mr-2" />
                                                    <span className="truncate">{application.candidate.education}</span>
                                                </div>
                                            </div>

                                            {/* Application Details */}
                                            <div className="mb-4 text-xs text-slate-500">
                                                <div className="flex justify-between">
                                                    <span>Applied: {new Date(application.applicationDate).toLocaleDateString()}</span>
                                                    <span>Source: {application.source}</span>
                                                </div>
                                                <div className="mt-1">
                                                    Last activity: {new Date(application.lastActivity).toLocaleDateString()}
                                                </div>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="mb-4">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-xs text-slate-600">Application Progress</span>
                                                    <span className="text-xs text-slate-600">
                                                        {application.status === 'new' ? '20%' :
                                                         application.status === 'in_review' ? '40%' :
                                                         application.status === 'shortlisted' ? '60%' :
                                                         application.status === 'interview_scheduled' ? '80%' :
                                                         application.status === 'hired' ? '100%' : '0%'}
                                                    </span>
                                                </div>
                                                <ProgressBar 
                                                    percentage={
                                                        application.status === 'new' ? 20 :
                                                        application.status === 'in_review' ? 40 :
                                                        application.status === 'shortlisted' ? 60 :
                                                        application.status === 'interview_scheduled' ? 80 :
                                                        application.status === 'hired' ? 100 : 0
                                                    }
                                                    color={
                                                        application.status === 'hired' ? 'green' :
                                                        application.status === 'rejected' ? 'red' :
                                                        application.status === 'interview_scheduled' ? 'blue' : 'yellow'
                                                    }
                                                />
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                                <div className="flex space-x-2">
                                                    <Button variant="ghost" size="sm" href={application.resumeUrl} icon={<FileText size={14} />}>
                                                        Resume
                                                    </Button>
                                                    {application.portfolioUrl && (
                                                        <Button variant="ghost" size="sm" href={application.portfolioUrl} icon={<Globe size={14} />}>
                                                            Portfolio
                                                        </Button>
                                                    )}
                                                </div>

                                                <div className="flex space-x-2">
                                                    <Button variant="outline" size="sm" icon={<MessageSquare size={14} />}>
                                                        Message
                                                    </Button>
                                                    {application.status === 'new' && (
                                                        <Button variant="primary" size="sm" icon={<Eye size={14} />}>
                                                            Review
                                                        </Button>
                                                    )}
                                                    {application.status === 'in_review' && (
                                                        <Button variant="success" size="sm" icon={<Star size={14} />}>
                                                            Shortlist
                                                        </Button>
                                                    )}
                                                    {application.status === 'shortlisted' && (
                                                        <Button variant="primary" size="sm" icon={<Calendar size={14} />}>
                                                            Schedule
                                                        </Button>
                                                    )}
                                                    {application.status === 'interview_scheduled' && (
                                                        <Button variant="success" size="sm" icon={<UserCheck size={14} />}>
                                                            Hire
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Quick Actions Menu */}
                                            <div className="absolute top-4 right-8">
                                                <Button variant="ghost" size="sm" icon={<MoreVertical size={16} />} onClick={(e) => e.stopPropagation()}>
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="p-6 bg-slate-100 rounded-full mb-6"
                            >
                                <Users size={48} className="text-slate-400" />
                            </motion.div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">No applications found</h3>
                            <p className="text-slate-500 mb-8 max-w-md">
                                {searchTerm || filterStatus !== "all" || filterExperience !== "all" || filterLocation !== "all" || filterSkills !== "all"
                                    ? "Try adjusting your search criteria or filters to see more results"
                                    : "Start by posting your first job opening to attract talented candidates"
                                }
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                {(searchTerm || filterStatus !== "all" || filterExperience !== "all" || filterLocation !== "all" || filterSkills !== "all") && (
                                    <Button variant="outline" onClick={clearFilters}>
                                        Clear All Filters
                                    </Button>
                                )}
                                <Button variant="primary" icon={<Plus size={18} />}>
                                    Post New Job
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Floating Action Button for Select All */}
            {sortedApplications.length > 0 && (
                <motion.div
                    className="fixed bottom-6 right-6 z-50"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleSelectAll}
                        className="rounded-full shadow-2xl"
                        icon={selectedApplications.length === sortedApplications.length ? <UserX size={20} /> : <UserCheck size={20} />}
                    >
                        {selectedApplications.length === sortedApplications.length ? 'Deselect All' : 'Select All'}
                    </Button>
                </motion.div>
            )}
        </PageLayout>
    );
};

export default Applications;
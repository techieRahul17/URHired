"use client" // This directive marks the component as a Client Component

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Plus, Search, Filter, ChevronDown, Briefcase, MapPin, Users, Calendar,
  Clock as ClockIcon, // Renamed Clock to ClockIcon to avoid conflict with Clock component in data
  MoreHorizontal, Bookmark, Share2, FileText, Award, Building,
  Star, MessageCircle, UserPlus, X, File, Image,
  Link, Copy, Save, Send, Eye, EyeOff, AlertCircle, CheckCircle,
  FilePlus, Trash2, Upload, Tag,
  Bold, Italic, List, ChevronLeft, Bell // Ensured Bell and other necessary icons are imported
} from "lucide-react"
// Removed: import { useRouter } from "next/navigation" // Removed Next.js router import to resolve compilation error

// --- Placeholder UI Components ---
// These components are included here to make the Jobs component self-contained and runnable.
// In a real application, you would typically import these from your shared UI component library.

/**
 * A basic PageLayout component for consistent page structure.
 */
const PageLayout = ({ title, children }) => (
  <div className="min-h-screen bg-gray-50 font-sans">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      {children}
    </div>
  </div>
)

/**
 * A basic Card component for consistent styling.
 */
const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>
    {children}
  </div>
)

/**
 * A basic Button component with different variants and sizes.
 */
const Button = ({ children, onClick, variant, size, className, icon, type = "button", disabled }) => {
  let baseStyles = "px-4 py-2 rounded-md font-medium transition-colors duration-200"
  if (variant === "outline") {
    baseStyles += " border border-gray-300 text-gray-700 hover:bg-gray-50"
  } else if (variant === "primary") {
    baseStyles += " bg-purple-600 text-white hover:bg-purple-700"
  } else if (variant === "default") {
    baseStyles += " bg-gray-200 text-gray-800 hover:bg-gray-300"
  } else if (variant === "ghost") {
    baseStyles += " text-gray-600 hover:bg-gray-100"
  } else if (variant === "destructive") {
    baseStyles += " bg-red-600 text-white hover:bg-red-700"
  }

  let sizeStyles = ""
  if (size === "sm") {
    sizeStyles = "text-sm px-3 py-1.5"
  } else if (size === "lg") {
    sizeStyles = "text-base px-5 py-2.5"
  }

  // Add disabled styles
  if (disabled) {
    baseStyles += " opacity-50 cursor-not-allowed"
  }

  return (
    <button type={type} onClick={onClick} className={`${baseStyles} ${sizeStyles} ${className}`} disabled={disabled}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
}

/**
 * A basic Badge component for displaying small, categorized labels.
 */
const Badge = ({ children, className, variant, size }) => {
  let variantStyles = ""
  if (variant === "success") {
    variantStyles = "bg-green-100 text-green-700"
  } else if (variant === "secondary") {
    variantStyles = "bg-gray-100 text-gray-700"
  } else if (variant === "warning") {
    variantStyles = "bg-yellow-100 text-yellow-700"
  } else if (variant === "primary") {
    variantStyles = "bg-blue-100 text-blue-700"
  } else if (variant === "outline") {
    variantStyles = "border border-gray-300 text-gray-700"
  } else if (variant === "info") {
    variantStyles = "bg-blue-100 text-blue-700"
  }

  let sizeStyles = ""
  if (size === "xs") {
    sizeStyles = "px-2 py-0.5 text-xs"
  } else if (size === "sm") {
    sizeStyles = "px-2.5 py-0.5 text-sm"
  }

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variantStyles} ${sizeStyles} ${className}`}>
      {children}
    </span>
  )
}

/**
 * A basic Input component with an optional icon and error display.
 */
const Input = ({ value, onChange, placeholder, icon, className, name, type = "text", error, onKeyPress, readOnly }) => (
  <div className="relative">
    {icon && (
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
    )}
    <input
      type={type}
      className={`w-full rounded-md border ${error ? 'border-red-500' : 'border-gray-300'} p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-black ${icon ? 'pl-10' : ''} ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      onKeyPress={onKeyPress}
      readOnly={readOnly}
    />
  </div>
)

// Placeholder for Alert components (simplified for self-containment)
const Alert = ({ children, variant, className }) => {
  let baseStyles = "p-4 rounded-lg flex items-start"
  if (variant === "destructive") {
    baseStyles += " bg-red-50 text-red-800 border border-red-200"
  } else {
    baseStyles += " bg-blue-50 text-blue-800 border border-blue-200"
  }
  return <div className={`${baseStyles} ${className}`}>{children}</div>
}

// Removed AlertTitle and AlertDescription placeholders as they are not directly used in the provided JSX
// and were likely causing issues with external imports.


const Jobs = () => {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [showFilters, setShowFilters] = useState(false) // Renamed from showAdvancedFilters for clarity in this context
    const [sortBy, setSortBy] = useState("newest")
    const [currentPage, setCurrentPage] = useState(1)
    const [expandedJobId, setExpandedJobId] = useState(null)
    const [savedJobs, setSavedJobs] = useState([])
    const [activeTab, setActiveTab] = useState("all")
    const [isCreatingJob, setIsCreatingJob] = useState(false) // State to control the "Create New Job" modal
    const [notification, setNotification] = useState(null)

    // State for the new job being created in the modal
    const [newJobData, setNewJobData] = useState({
        title: "",
        department: "",
        location: "",
        type: "Full-time",
        status: "draft",
        postedDate: new Date().toISOString().split('T')[0],
        deadline: "",
        description: "",
        requirements: [],
        benefits: [],
        salary: "",
        company: {
            name: "",
            size: "",
            founded: "",
            rating: 0,
            description: ""
        },
        attachments: [],
        tags: []
    });
    const [newJobErrors, setNewJobErrors] = useState({});
    const [newRequirement, setNewRequirement] = useState("");
    const [newBenefit, setNewBenefit] = useState("");
    const [newTag, setNewTag] = useState("");
    const [jobLink, setJobLink] = useState(""); // For the link generated after publishing
    const [copied, setCopied] = useState(false); // For copy link button feedback

    // const router = useRouter() // Removed useRouter hook

    const itemsPerPage = 6

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
                    postedDate: "2025-07-23", // Using YYYY-MM-DD for reliable Date parsing
                    deadline: "2025-04-30",
                    description: "We're looking for an experienced frontend developer with React expertise.",
                    requirements: ["React", "TypeScript", "CSS3", "Responsive Design", "Redux", "Jest"],
                    salary: "$90,000 - $120,000",
                    benefits: ["Health Insurance", "401k", "Flexible Hours", "Remote Work"],
                    company: {
                        name: "TechCorp Inc.",
                        size: "100-500 employees",
                        founded: "2015",
                        rating: 4.7
                    }
                },
                {
                    id: 2,
                    title: "Machine Learning Engineer",
                    department: "Data Science",
                    location: "New York, NY",
                    type: "Full-time",
                    applicants: 18,
                    status: "active",
                    postedDate: "2025-07-22",
                    deadline: "2025-05-15",
                    description: "Join our team to build cutting-edge ML solutions for our SaaS platform.",
                    requirements: ["Python", "TensorFlow", "PyTorch", "AWS", "Docker", "MLOps"],
                    salary: "$110,000 - $140,000",
                    benefits: ["Health Insurance", "Stock Options", "Unlimited PTO", "Remote Work"],
                    company: {
                        name: "DataMinds AI",
                        size: "50-100 employees",
                        founded: "2018",
                        rating: 4.9
                    }
                },
                {
                    id: 3,
                    title: "UX/UI Designer",
                    department: "Design",
                    location: "San Francisco, CA",
                    type: "Full-time",
                    applicants: 32,
                    status: "active",
                    postedDate: "2025-07-20",
                    deadline: "2025-04-25",
                    description: "Create beautiful, intuitive user experiences for our products.",
                    requirements: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
                    salary: "$85,000 - $110,000",
                    benefits: ["Health Insurance", "Flexible Hours", "Creative Freedom", "Remote Work"],
                    company: {
                        name: "Creative Solutions",
                        size: "20-50 employees",
                        founded: "2016",
                        rating: 4.5
                    }
                },
                {
                    id: 4,
                    title: "DevOps Engineer",
                    department: "Infrastructure",
                    location: "Remote",
                    type: "Full-time",
                    applicants: 15,
                    status: "closed",
                    postedDate: "2025-07-18",
                    deadline: "2025-04-10",
                    description: "Ensure our infrastructure is reliable, scalable, and secure for our global user base.",
                    requirements: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Monitoring"],
                    salary: "$100,000 - $130,000",
                    benefits: ["Health Insurance", "401k", "Flexible Hours", "Remote Work"],
                    company: {
                        name: "CloudTech Systems",
                        size: "50-100 employees",
                        founded: "2017",
                        rating: 4.6
                    }
                },
                {
                    id: 5,
                    title: "Product Manager",
                    department: "Product",
                    location: "Austin, TX",
                    type: "Full-time",
                    applicants: 28,
                    status: "active",
                    postedDate: "2025-07-18",
                    deadline: "2025-05-05",
                    description: "Lead product strategy and execution for our SaaS platform.",
                    requirements: ["Product Strategy", "Agile", "User Stories", "Analytics", "Roadmapping"],
                    salary: "$95,000 - $125,000",
                    benefits: ["Health Insurance", "Stock Options", "Flexible Hours", "Remote Work"],
                    company: {
                        name: "ProductForge",
                        size: "20-50 employees",
                        founded: "2019",
                        rating: 4.8
                    }
                },
                {
                    id: 6,
                    title: "Marketing Specialist",
                    department: "Marketing",
                    location: "Chicago, IL",
                    type: "Contract",
                    applicants: 12,
                    status: "draft",
                    postedDate: "2025-07-11",
                    deadline: "2025-05-20",
                    description: "Drive our marketing campaigns and brand awareness.",
                    requirements: ["Digital Marketing", "Content Creation", "SEO", "Analytics", "Social Media"],
                    salary: "$70,000 - $90,000",
                    benefits: ["Flexible Hours", "Remote Work", "Performance Bonuses"],
                    company: {
                        name: "GrowthHackers Inc.",
                        size: "10-20 employees",
                        founded: "2020",
                        rating: 4.4
                    }
                },
            ])
            setLoading(false)
        }, 1500)
    }, [])

    // Enhanced filtering with more criteria
    const filteredJobs = jobs.filter((job) => {
        // Filter by search term
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.department.toLowerCase().includes(searchTerm.toLowerCase())
        
        // Filter by status
        const matchesStatus = filterStatus === "all" || job.status === filterStatus
        
        return matchesSearch && matchesStatus
    }).filter(job => { // Filter by activeTab for the main job listings
        if (activeTab === "all") return true;
        return job.status === activeTab;
    });

    // Enhanced sorting functionality
    const sortedJobs = [...filteredJobs].sort((a, b) => {
        switch (sortBy) {
            case "newest":
                return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
            case "oldest":
                return new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime();
            case "mostApplicants":
                return b.applicants - a.applicants
            case "leastApplicants":
                return a.applicants - b.applicants
            case "highestSalary":
                // Extracts the second number from "X - Y" for comparison. Handles non-numeric chars.
                const bSalaryHigh = parseInt(b.salary.split('-')[1]?.replace(/[^0-9]/g, '') || '0');
                const aSalaryHigh = parseInt(a.salary.split('-')[1]?.replace(/[^0-9]/g, '') || '0');
                return bSalaryHigh - aSalaryHigh;
            case "lowestSalary":
                // Extracts the first number from "X - Y" for comparison. Handles non-numeric chars.
                const aSalaryLow = parseInt(a.salary.split('-')[0]?.replace(/[^0-9]/g, '') || '0');
                const bSalaryLow = parseInt(b.salary.split('-')[0]?.replace(/[^0-9]/g, '') || '0');
                return aSalaryLow - bSalaryLow;
            default:
                return 0
        }
    })

    // Job statistics for dashboard summary
    const jobStats = {
        total: jobs.length,
        active: jobs.filter(job => job.status === "active").length,
        closed: jobs.filter(job => job.status === "closed").length,
        draft: jobs.filter(job => job.status === "draft").length,
        totalApplicants: jobs.reduce((sum, job) => sum + job.applicants, 0)
    }

    // Toggle job save status
    const toggleSaveJob = (jobId) => {
        if (savedJobs.includes(jobId)) {
            setSavedJobs(savedJobs.filter(id => id !== jobId))
            showNotification(`Job removed from saved list`, "success")
        } else {
            setSavedJobs([...savedJobs, jobId])
            showNotification(`Job added to saved list`, "success")
        }
    }

    // Show notification
    const showNotification = (message, type = "success") => {
        setNotification({ message, type })
        setTimeout(() => setNotification(null), 5000)
    }

    // Generate job link (for the new job creation modal)
    const generateJobLinkForDisplay = (id, title) => { // Renamed to avoid conflict with local scope 'job'
        const jobTitleSlug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
        return `${window.location.origin}/jobs/${id}-${jobTitleSlug}`
    }

    // Copy job link to clipboard
    const copyJobLink = (link) => {
        // Using document.execCommand('copy') for broader compatibility in iframes
        const el = document.createElement('textarea');
        el.value = link;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        setCopied(true)
        showNotification("Job link copied to clipboard!", "success")
        setTimeout(() => setCopied(false), 3000)
    }

    // Handle input changes for the new job data in the modal
    const handleNewJobDataChange = (e) => {
        const { name, value } = e.target;
        setNewJobData(prev => ({ ...prev, [name]: value }));
    };

    // Handle company info changes for the new job data in the modal
    const handleNewJobCompanyChange = (e) => {
        const { name, value } = e.target;
        setNewJobData(prev => ({
            ...prev,
            company: { ...prev.company, [name]: value }
        }));
    };

    // Add new requirement for new job
    const addNewJobRequirement = () => {
        if (newRequirement.trim() && !newJobData.requirements.includes(newRequirement.trim())) {
            setNewJobData(prev => ({
                ...prev,
                requirements: [...prev.requirements, newRequirement.trim()]
            }));
            setNewRequirement("");
        }
    };

    // Remove requirement for new job
    const removeNewJobRequirement = (index) => {
        setNewJobData(prev => ({
            ...prev,
            requirements: prev.requirements.filter((_, i) => i !== index)
        }));
    };

    // Add new benefit for new job
    const addNewJobBenefit = () => {
        if (newBenefit.trim() && !newJobData.benefits.includes(newBenefit.trim())) {
            setNewJobData(prev => ({
                ...prev,
                benefits: [...prev.benefits, newBenefit.trim()]
            }));
            setNewBenefit("");
        }
    };

    // Remove benefit for new job
    const removeNewJobBenefit = (index) => {
        setNewJobData(prev => ({
            ...prev,
            benefits: prev.benefits.filter((_, i) => i !== index)
        }));
    };

    // Add new tag for new job
    const addNewJobTag = () => {
        if (newTag.trim() && !newJobData.tags.includes(newTag.trim())) {
            setNewJobData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag("");
        }
    };

    // Remove tag for new job
    const removeNewJobTag = (index) => {
        setNewJobData(prev => ({
            ...prev,
            tags: prev.tags.filter((_, i) => i !== index)
        }));
    };

    // Handle file upload for new job
    const handleNewJobFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setNewJobData(prev => ({
            ...prev,
            attachments: [...prev.attachments, ...files]
        }));
    };

    // Remove attachment for new job
    const removeNewJobAttachment = (index) => {
        setNewJobData(prev => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index)
        }));
    };

    // Validate form for new job creation
    const validateNewJobForm = () => {
        const errors = {};
        if (!newJobData.title.trim()) errors.title = "Job title is required";
        if (!newJobData.department.trim()) errors.department = "Department is required";
        if (!newJobData.location.trim()) errors.location = "Location is required";
        if (!newJobData.deadline) errors.deadline = "Deadline is required";
        if (!newJobData.description.trim()) errors.description = "Job description is required";
        if (newJobData.requirements.length === 0) errors.requirements = "At least one requirement is needed";
        if (!newJobData.company.name.trim()) errors.companyName = "Company name is required";
        if (!newJobData.salary.trim()) errors.salary = "Salary range is required";
        
        setNewJobErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Create new job (called from modal)
    const handleCreateNewJob = () => {
        if (validateNewJobForm()) {
            setLoading(true);
            const newId = Math.random().toString(36).substring(2, 10);
            const jobWithId = { ...newJobData, id: newId };
            
            setTimeout(() => {
                setJobs(prevJobs => [jobWithId, ...prevJobs]); // Add new job to the top
                setLoading(false);
                setIsCreatingJob(false); // Close modal
                showNotification("New job created successfully!", "success");
                // Reset new job form data
                setNewJobData({
                    title: "", department: "", location: "", type: "Full-time", status: "draft",
                    postedDate: new Date().toISOString().split('T')[0], deadline: "", description: "",
                    requirements: [], benefits: [], salary: "", company: { name: "", size: "", founded: "", rating: 0, description: "" },
                    attachments: [], tags: []
                });
                setNewJobErrors({});
                setNewRequirement("");
                setNewBenefit("");
                setNewTag("");

                // Optionally redirect to the new job's edit page or detail page
                router.push(`/recruiter/jobs/${newId}/edit`); // Using router.push
            }, 1500);
        } else {
            showNotification("Please fill in all required fields for the new job.", "error");
        }
    };

    // Cancel new job creation (from modal)
    const cancelNewJobCreation = () => {
        if (window.confirm("Are you sure you want to discard this new job? All unsaved changes will be lost.")) {
            setIsCreatingJob(false);
            // Reset new job form data
            setNewJobData({
                title: "", department: "", location: "", type: "Full-time", status: "draft",
                postedDate: new Date().toISOString().split('T')[0], deadline: "", description: "",
                requirements: [], benefits: [], salary: "", company: { name: "", size: "", founded: "", rating: 0, description: "" },
                attachments: [], tags: []
            });
            setNewJobErrors({});
            setNewRequirement("");
            setNewBenefit("");
            setNewTag("");
        }
    };


    // Get company size badge
    const getCompanySizeBadge = (size) => {
        let variant = "secondary"; // Default variant
        let text = "Unknown";
        switch(size) {
            case "10-20 employees":
                variant = "info";
                text = "Startup";
                break;
            case "20-50 employees":
                variant = "success";
                text = "Small";
                break;
            case "50-100 employees":
                variant = "warning";
                text = "Medium";
                break;
            case "100-500 employees":
                variant = "primary";
                text = "Large";
                break;
            case "1-10 employees": // Added missing cases for company size
                variant = "info";
                text = "Micro";
                break;
            case "11-50 employees":
                variant = "success";
                text = "Small";
                break;
            case "51-200 employees":
                variant = "warning";
                text = "Mid-size";
                break;
            case "201-500 employees":
                variant = "primary";
                text = "Large";
                break;
            case "501-1000 employees":
                variant = "primary";
                text = "Enterprise";
                break;
            case "1000+ employees":
                variant = "primary";
                text = "Huge";
                break;
        }
        return <Badge variant={variant} size="sm">{text}</Badge>
    }

    // Pagination
    const totalPages = Math.ceil(sortedJobs.length / itemsPerPage)
    const currentJobs = sortedJobs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const getStatusBadge = (status) => {
        switch (status) {
            case "active":
                return <Badge variant="success">Active</Badge>
            case "closed":
                return <Badge variant="secondary">Closed</Badge>
            case "draft":
                return <Badge variant="warning">Draft</Badge>
            case "pending": // Added pending status badge
                return <Badge variant="info">Pending</Badge>
            default:
                return null
        }
    }

    // Render Rich Text Editor (placeholder for new job modal)
    const renderNewJobRichTextEditor = () => (
        <div className="border border-gray-300 rounded-lg p-4 min-h-40">
            <div className="flex flex-wrap gap-2 mb-4 border-b pb-2">
                <button type="button" className="p-2 hover:bg-gray-100 rounded">
                    <FileText size={16} />
                </button>
                <button type="button" className="p-2 hover:bg-gray-100 rounded">
                    <Bold size={16} />
                </button>
                <button type="button" className="p-2 hover:bg-gray-100 rounded">
                    <Italic size={16} />
                </button>
                <button type="button" className="p-2 hover:bg-gray-100 rounded">
                    <List size={16} />
                </button>
                <button type="button" className="p-2 hover:bg-gray-100 rounded">
                    <Link size={16} />
                </button>
                <button type="button" className="p-2 hover:bg-gray-100 rounded">
                    <Image size={16} />
                </button>
            </div>
            <textarea
                className="w-full min-h-32 p-2 border-none focus:outline-none resize-none"
                placeholder="Write your job description here..."
                value={newJobData.description}
                onChange={(e) => handleNewJobDataChange({ target: { name: 'description', value: e.target.value } })}
            ></textarea>
        </div>
    )


    return (
        <PageLayout title="Job Postings">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Job Postings</h1>
                    <p className="text-sm text-gray-600 mt-1">Manage your job listings and applications</p>
                </div>
                <div className="flex items-center space-x-3">
                    <Button
                        variant="primary"
                        onClick={() => setIsCreatingJob(true)} // Open the creation modal
                        className="flex items-center"
                    >
                        <Plus size={18} className="mr-2" />
                        Create New Job
                    </Button>
                    <div className="relative">
                        <Bell size={20} className="text-gray-500 cursor-pointer" />
                        {/* Simplified notification count display */}
                        {notification && notification.type === 'success' && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                1 {/* Assuming 1 notification when successful */}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                            <Users size={18} className="text-purple-600" /> {/* Changed to Users for general user icon */}
                        </div>
                        <span className="text-sm font-medium">Admin</span>
                        <ChevronDown size={16} className="text-gray-500" />
                    </div>
                </div>
            </div>

            {/* Notification Toast */}
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.3 }}
                    className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md ${notification.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}
                >
                    <div className="flex items-start">
                        <div className={`p-2 rounded-full ${notification.type === 'success' ? 'bg-green-100' : 'bg-red-100'} mr-3`}>
                            {notification.type === 'success' ? <CheckCircle size={20} className="text-green-600" /> : <AlertCircle size={20} className="text-red-600" />}
                        </div>
                        <div>
                            <p className="font-medium">{notification.message}</p>
                        </div>
                        <button type="button" onClick={() => setNotification(null)} className="ml-auto text-gray-500 hover:text-gray-700">
                            <X size={16} />
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Job Creation Modal */}
            {isCreatingJob && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Create New Job</h2>
                            <button
                                type="button"
                                onClick={cancelNewJobCreation}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Basic Information */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
                                            <Input
                                                placeholder="e.g. Senior Frontend Developer"
                                                value={newJobData.title}
                                                onChange={handleNewJobDataChange}
                                                name="title"
                                                error={newJobErrors.title}
                                            />
                                            {newJobErrors.title && <p className="text-red-500 text-xs mt-1">{newJobErrors.title}</p>}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Department*</label>
                                            <Input
                                                placeholder="e.g. Engineering"
                                                value={newJobData.department}
                                                onChange={handleNewJobDataChange}
                                                name="department"
                                                error={newJobErrors.department}
                                            />
                                            {newJobErrors.department && <p className="text-red-500 text-xs mt-1">{newJobErrors.department}</p>}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                                            <Input
                                                placeholder="e.g. Remote, New York, NY"
                                                value={newJobData.location}
                                                onChange={handleNewJobDataChange}
                                                name="location"
                                                error={newJobErrors.location}
                                            />
                                            {newJobErrors.location && <p className="text-red-500 text-xs mt-1">{newJobErrors.location}</p>}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Type*</label>
                                            <select
                                                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-black"
                                                value={newJobData.type}
                                                onChange={handleNewJobDataChange}
                                                name="type"
                                            >
                                                <option value="Full-time">Full-time</option>
                                                <option value="Part-time">Part-time</option>
                                                <option value="Contract">Contract</option>
                                                <option value="Internship">Internship</option>
                                                <option value="Freelance">Freelance</option>
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                            <select
                                                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-black"
                                                value={newJobData.status}
                                                onChange={handleNewJobDataChange}
                                                name="status"
                                            >
                                                <option value="draft">Draft</option>
                                                <option value="active">Active</option>
                                                <option value="closed">Closed</option>
                                                <option value="pending">Pending Review</option>
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Deadline*</label>
                                            <Input
                                                type="date"
                                                value={newJobData.deadline}
                                                onChange={handleNewJobDataChange}
                                                name="deadline"
                                                error={newJobErrors.deadline}
                                            />
                                            {newJobErrors.deadline && <p className="text-red-500 text-xs mt-1">{newJobErrors.deadline}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Company Information */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name*</label>
                                            <Input
                                                placeholder="e.g. TechCorp Inc."
                                                value={newJobData.company.name}
                                                onChange={handleNewJobCompanyChange}
                                                name="name"
                                                error={newJobErrors.companyName}
                                            />
                                            {newJobErrors.companyName && <p className="text-red-500 text-xs mt-1">{newJobErrors.companyName}</p>}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                                            <select
                                                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-black"
                                                value={newJobData.company.size}
                                                onChange={handleNewJobCompanyChange}
                                                name="size"
                                            >
                                                <option value="">Select Size</option>
                                                <option value="1-10 employees">1-10 employees</option>
                                                <option value="11-50 employees">11-50 employees</option>
                                                <option value="51-200 employees">51-200 employees</option>
                                                <option value="201-500 employees">201-500 employees</option>
                                                <option value="501-1000 employees">501-1000 employees</option>
                                                <option value="1000+ employees">1000+ employees</option>
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Founded Year</label>
                                            <Input
                                                type="number"
                                                placeholder="e.g. 2015"
                                                value={newJobData.company.founded}
                                                onChange={handleNewJobCompanyChange}
                                                name="founded"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Description</label>
                                            <textarea
                                                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-black min-h-24"
                                                placeholder="Write a brief description of your company..."
                                                value={newJobData.company.description || ""}
                                                onChange={(e) => handleNewJobCompanyChange({ target: { name: 'description', value: e.target.value } })}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Job Details */}
                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Job Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range*</label>
                                    <Input
                                        placeholder="e.g. $90,000 - $120,000"
                                        value={newJobData.salary}
                                        onChange={handleNewJobDataChange}
                                        name="salary"
                                        error={newJobErrors.salary}
                                    />
                                    {newJobErrors.salary && <p className="text-red-500 text-xs mt-1">{newJobErrors.salary}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Description*</label>
                                    {renderNewJobRichTextEditor()}
                                    {newJobErrors.description && <p className="text-red-500 text-xs mt-1">{newJobErrors.description}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                                    <div className="flex items-center mb-2">
                                        <Input
                                            placeholder="Add a requirement"
                                            value={newRequirement}
                                            onChange={(e) => setNewRequirement(e.target.value)}
                                            className="flex-1 mr-2"
                                            onKeyPress={(e) => e.key === 'Enter' && addNewJobRequirement()}
                                        />
                                        <Button 
                                            type="button" 
                                            variant="outline" 
                                            size="sm"
                                            onClick={addNewJobRequirement}
                                        >
                                            <Plus size={16} />
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {newJobData.requirements.map((req, index) => (
                                            <Badge 
                                                key={index} 
                                                variant="outline" 
                                                className="flex items-center text-xs py-1 px-2"
                                            >
                                                {req}
                                                <button 
                                                    type="button"
                                                    className="ml-1 text-gray-500 hover:text-red-500"
                                                    onClick={() => removeNewJobRequirement(index)}
                                                >
                                                    <X size={12} />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                    {newJobErrors.requirements && <p className="text-red-500 text-xs mt-1">{newJobErrors.requirements}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                                    <div className="flex items-center mb-2">
                                        <Input
                                            placeholder="Add a benefit"
                                            value={newBenefit}
                                            onChange={(e) => setNewBenefit(e.target.value)}
                                            className="flex-1 mr-2"
                                            onKeyPress={(e) => e.key === 'Enter' && addNewJobBenefit()}
                                        />
                                        <Button 
                                            type="button" 
                                            variant="outline" 
                                            size="sm"
                                            onClick={addNewJobBenefit}
                                        >
                                            <Plus size={16} />
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {newJobData.benefits.map((benefit, index) => (
                                            <Badge 
                                                key={index} 
                                                variant="outline" 
                                                className="flex items-center text-xs py-1 px-2"
                                            >
                                                {benefit}
                                                <button 
                                                    type="button"
                                                    className="ml-1 text-gray-500 hover:text-red-500"
                                                    onClick={() => removeNewJobBenefit(index)}
                                                >
                                                    <X size={12} />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Advanced Options */}
                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Advanced Options</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                        <FilePlus size={24} className="mx-auto text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-500 mb-2">Drag and drop files here, or click to select</p>
                                        <input
                                            type="file"
                                            multiple
                                            className="hidden"
                                            id="new-job-file-upload"
                                            onChange={handleNewJobFileUpload}
                                        />
                                        <Button 
                                            type="button" 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => document.getElementById('new-job-file-upload').click()}
                                        >
                                            Browse Files
                                        </Button>
                                    </div>
                                    {newJobData.attachments.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            <h3 className="text-sm font-medium text-gray-700">Uploaded Files</h3>
                                            {newJobData.attachments.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                                    <div className="flex items-center">
                                                        <File size={16} className="text-gray-500 mr-2" />
                                                        <span className="text-sm text-black">{file.name}</span>
                                                    </div>
                                                    <button 
                                                        type="button"
                                                        className="text-gray-500 hover:text-red-500"
                                                        onClick={() => removeNewJobAttachment(index)}
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags & Keywords</label>
                                    <div className="flex items-center mb-2">
                                        <Input
                                            placeholder="Add a tag or keyword"
                                            value={newTag}
                                            onChange={(e) => setNewTag(e.target.value)}
                                            className="flex-1 mr-2"
                                            onKeyPress={(e) => e.key === 'Enter' && addNewJobTag()}
                                        />
                                        <Button 
                                            type="button" 
                                            variant="outline" 
                                            size="sm"
                                            onClick={addNewJobTag}
                                        >
                                            <Plus size={16} />
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {newJobData.tags.map((tag, index) => (
                                            <Badge 
                                                key={index} 
                                                variant="outline" 
                                                className="flex items-center text-xs py-1 px-2"
                                            >
                                                {tag}
                                                <button 
                                                    type="button"
                                                    className="ml-1 text-gray-500 hover:text-red-500"
                                                    onClick={() => removeNewJobTag(index)}
                                                >
                                                    <X size={12} />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons for New Job Modal */}
                            <div className="flex justify-end space-x-3 mt-6">
                                <Button 
                                    type="button"
                                    variant="outline" 
                                    onClick={cancelNewJobCreation}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="button"
                                    variant="primary" 
                                    onClick={handleCreateNewJob}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                    ) : (
                                        <Plus size={18} className="mr-2" />
                                    )}
                                    Create Job
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Job Listings View */}
            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
                <nav className="flex space-x-8">
                    <button
                        type="button"
                        onClick={() => setActiveTab("all")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === "all"
                                ? "border-purple-500 text-purple-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        All Jobs
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("active")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === "active"
                                ? "border-purple-500 text-purple-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        Active Jobs
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("draft")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === "draft"
                                ? "border-purple-500 text-purple-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        Draft Jobs
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("closed")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === "closed"
                                ? "border-purple-500 text-purple-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        Closed Jobs
                    </button>
                </nav>
            </div>

            {/* Job Listings */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            ) : (
                <>
                    {currentJobs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentJobs.map((job, index) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="h-full"
                                >
                                    <Card className="h-full hover:shadow-lg transition-shadow">
                                        <div className="p-5">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="p-2 bg-purple-100 rounded-full">
                                                    <Briefcase size={20} className="text-purple-600" />
                                                </div>
                                                {getStatusBadge(job.status)}
                                            </div>
                                            
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="text-lg font-bold text-black mb-1">{job.title}</h3>
                                                    <p className="text-sm text-black mb-2">{job.department}</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <Badge variant="primary" size="sm" className="mr-2">
                                                        {job.type}
                                                    </Badge>
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleSaveJob(job.id)}
                                                        className={`p-1 rounded-full ${savedJobs.includes(job.id) ? 'bg-yellow-100' : 'bg-gray-100'}`}
                                                        title={savedJobs.includes(job.id) ? "Remove from saved" : "Save job"}
                                                    >
                                                        <Bookmark size={16} className={savedJobs.includes(job.id) ? "text-yellow-600 fill-current" : "text-gray-500"} />
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center text-sm text-black">
                                                    <MapPin size={16} className="mr-2 text-gray-500" />
                                                    {job.location}
                                                </div>
                                                <div className="flex items-center text-sm text-black">
                                                    <Users size={16} className="mr-2 text-gray-500" />
                                                    {job.applicants} Applicants
                                                </div>
                                                <div className="flex items-center text-sm text-black">
                                                    <Calendar size={16} className="mr-2 text-gray-500" />
                                                    Deadline: {job.deadline}
                                                </div>
                                                <div className="flex items-center text-sm text-black">
                                                    <ClockIcon size={16} className="mr-2 text-gray-500" />
                                                    Posted {job.postedDate}
                                                </div>
                                            </div>
                                            
                                            {expandedJobId === job.id && (
                                                <div className="mt-3 pt-3 border-t border-gray-100 animate-fadeIn">
                                                    <div className="mb-3">
                                                        <h4 className="text-sm font-semibold text-black mb-1">Job Description</h4>
                                                        <p className="text-sm text-black">{job.description}</p>
                                                    </div>
                                                    <div className="mb-3">
                                                        <h4 className="text-sm font-semibold text-black mb-1">Requirements</h4>
                                                        <div className="flex flex-wrap gap-1">
                                                            {job.requirements.map((req, i) => (
                                                                <Badge key={i} variant="outline" size="xs">
                                                                    {req}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <h4 className="text-sm font-semibold text-black mb-1">Salary Range</h4>
                                                        <p className="text-sm text-black">{job.salary}</p>
                                                    </div>
                                                    <div className="mb-3">
                                                        <h4 className="text-sm font-semibold text-black mb-1">Benefits</h4>
                                                        <div className="flex flex-wrap gap-1">
                                                            {job.benefits.map((benefit, i) => (
                                                                <Badge key={i} variant="outline" size="xs">
                                                                    {benefit}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <h4 className="text-sm font-semibold text-black mb-1">Company</h4>
                                                        <div className="flex items-center space-x-2">
                                                            <Building size={16} className="text-gray-500" />
                                                            <div>
                                                                <p className="text-sm font-medium text-black">{job.company.name}</p>
                                                                <div className="flex items-center space-x-1">
                                                                    {getCompanySizeBadge(job.company.size)}
                                                                    <span className="text-xs text-gray-500">•</span>
                                                                    <div className="flex items-center">
                                                                        <Star size={12} className="text-yellow-400 fill-current mr-1" />
                                                                        <span className="text-xs text-gray-500">{job.company.rating}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                                                <Button 
                                                    type="button"
                                                    variant="outline" 
                                                    size="sm" 
                                                    onClick={() => setExpandedJobId(expandedJobId === job.id ? null : job.id)}
                                                >
                                                    {expandedJobId === job.id ? "Show Less" : "View Details"}
                                                </Button>
                                                <div className="flex space-x-2">
                                                    <Button 
                                                        type="button"
                                                        variant="ghost" 
                                                        size="sm" 
                                                        className="h-8 w-8 p-0"
                                                        onClick={() => copyJobLink(generateJobLinkForDisplay(job.id, job.title))} // Pass job details to generate and copy link
                                                        title="Share job"
                                                    >
                                                        <Share2 size={16} />
                                                    </Button>
                                                    <Button 
                                                        type="button"
                                                        variant="primary" 
                                                        size="sm"
                                                        onClick={() => router.push(`/recruiter/jobs/${job.id}/apply`)} // Using router.push
                                                    >
                                                        Apply Now
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                            <div className="p-4 bg-purple-100 rounded-full mb-4">
                                <Briefcase size={32} className="text-purple-600" />
                            </div>
                            <h3 className="text-lg font-medium text-black mb-1">No jobs found</h3>
                            <p className="text-black mb-4">Try adjusting your search or filters</p>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setSearchTerm("")
                                    setFilterStatus("all")
                                    setSortBy("newest")
                                }}
                                className="flex items-center"
                            >
                                <Filter size={14} className="mr-2" />
                                Clear Filters
                            </Button>
                        </div>
                    )}
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-8 flex justify-center">
                            <div className="inline-flex rounded-md shadow-sm">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="rounded-l-md"
                                >
                                    Previous
                                </Button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <Button
                                        type="button"
                                        key={i}
                                        variant={currentPage === i + 1 ? "primary" : "outline"}
                                        size="sm"
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-8 h-8`}
                                    >
                                        {i + 1}
                                    </Button>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="rounded-r-md"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
            
            {/* Notification Toast */}
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.3 }}
                    className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg border max-w-xs z-50 ${notification.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className={`p-2 rounded-full ${notification.type === 'success' ? 'bg-green-100' : 'bg-red-100'} mr-3`}>
                                {notification.type === 'success' ? <CheckCircle size={16} className="text-green-600" /> : <AlertCircle size={16} className="text-red-600" />}
                            </div>
                            <p className="text-sm font-medium">{notification.message}</p>
                        </div>
                        <button type="button" onClick={() => setNotification(null)} className="ml-4 text-gray-500 hover:text-gray-700">
                            <X size={16} />
                        </button>
                    </div>
                </motion.div>
            )}
        </PageLayout>
    )
}

export default Jobs

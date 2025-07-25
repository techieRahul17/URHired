"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Globe,
    Briefcase,
    GraduationCap,
    Award,
    FileText,
    CheckCircle,
    XCircle,
    Calendar,
    MessageSquare,
    Clock,
    Video,
    User,
} from "lucide-react"
import PageLayout from "../../components/layout/PageLayout"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Badge from "../../components/ui/Badge"
import Avatar from "../../components/ui/Avatar"
import ProgressBar from "../../components/ui/ProgressBar"

const CandidateDetails = () => {
    const { id } = useParams()
    const [candidate, setCandidate] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("overview")

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setCandidate({
                id: Number.parseInt(id),
                name: "John Doe",
                email: "john.doe@example.com",
                phone: "+1 (555) 123-4567",
                location: "San Francisco, CA",
                website: "johndoe.com",
                appliedFor: "Senior Frontend Developer",
                matchScore: 92,
                status: "interview",
                appliedDate: "April 2, 2025",
                skills: [
                    { name: "React.js", level: 95 },
                    { name: "JavaScript", level: 90 },
                    { name: "TypeScript", level: 85 },
                    { name: "HTML/CSS", level: 90 },
                    { name: "Node.js", level: 80 },
                    { name: "Redux", level: 85 },
                ],
                experience: [
                    {
                        id: 1,
                        company: "Tech Solutions Inc.",
                        position: "Frontend Developer",
                        duration: "Jan 2022 - Present",
                        description:
                            "Led the development of multiple web applications using React.js, Redux, and TypeScript. Collaborated with designers and backend developers to implement new features and improve user experience.",
                    },
                    {
                        id: 2,
                        company: "Digital Innovations",
                        position: "Junior Developer",
                        duration: "Jun 2020 - Dec 2021",
                        description:
                            "Developed and maintained web applications using JavaScript, HTML, and CSS. Worked on bug fixes and small feature implementations.",
                    },
                ],
                education: [
                    {
                        id: 1,
                        institution: "University of California, Berkeley",
                        degree: "Bachelor of Science in Computer Science",
                        duration: "2016 - 2020",
                        gpa: "3.8/4.0",
                    },
                ],
                certifications: [
                    { id: 1, name: "AWS Certified Developer", issuer: "Amazon Web Services", date: "2023" },
                    { id: 2, name: "React Certification", issuer: "Meta", date: "2022" },
                ],
                interviews: [
                    {
                        id: 1,
                        type: "Technical Interview",
                        date: "Today",
                        time: "2:00 PM - 3:00 PM",
                        format: "Video Call",
                        interviewer: "Sarah Johnson (Tech Lead)",
                    },
                ],
                notes: [
                    {
                        id: 1,
                        author: "Emily Chen",
                        date: "April 1, 2025",
                        content:
                            "Initial resume screening shows strong technical skills and relevant experience. Recommend proceeding with technical interview.",
                    },
                ],
            })

            setLoading(false)
        }, 1500)
    }, [id])

    const getStatusBadge = (status) => {
        switch (status) {
            case "new":
                return <Badge variant="info">New Application</Badge>
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

    if (loading) {
        return (
            <PageLayout title="Candidate Details">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            </PageLayout>
        )
    }

    return (
        <PageLayout title="Candidate Details">
            <div className="mb-6">
                <Link
                    to="/recruiter/applications"
                    className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors"
                >
                    <ArrowLeft size={16} className="mr-1" />
                    Back to Applications
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card className="p-6 mb-6">
                        <div className="flex flex-col items-center text-center mb-6">
                            <Avatar src={null} alt={candidate.name} size="2xl" />
                            <h1 className="text-xl font-bold mt-4 mb-1 text-black">{candidate.name}</h1>
                            <p className="text-black">{candidate.appliedFor}</p>

                            <div className="mt-4">{getStatusBadge(candidate.status)}</div>

                            <div className="mt-4 w-full">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-black">Match Score</span>
                                    <span className="text-sm font-medium text-black">{candidate.matchScore}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full"
                                        style={{ width: `${candidate.matchScore}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Mail size={18} className="text-black mr-3" />
                                <div>
                                    <p className="text-sm text-black">Email</p>
                                    <p className="font-medium text-black">{candidate.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <Phone size={18} className="text-black mr-3" />
                                <div>
                                    <p className="text-sm text-black">Phone</p>
                                    <p className="font-medium text-black">{candidate.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <MapPin size={18} className="text-black mr-3" />
                                <div>
                                    <p className="text-sm text-black">Location</p>
                                    <p className="font-medium text-black">{candidate.location}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <Globe size={18} className="text-black mr-3" />
                                <div>
                                    <p className="text-sm text-black">Website</p>
                                    <p className="font-medium text-black">{candidate.website}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <Calendar size={18} className="text-black mr-3" />
                                <div>
                                    <p className="text-sm text-black">Applied On</p>
                                    <p className="font-medium text-black">{candidate.appliedDate}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <h3 className="font-medium mb-4 text-black">Skills</h3>

                            <div className="space-y-3">
                                {candidate.skills.map((skill) => (
                                    <div key={skill.name}>
                                        <ProgressBar label={skill.name} value={skill.level} max={100} size="sm" color="primary" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="font-medium mb-4 text-black">Quick Actions</h3>

                        <div className="space-y-3">
                            <Button variant="primary" fullWidth icon={<Calendar size={16} />}>
                                Schedule Interview
                            </Button>

                            <Button variant="outline" fullWidth icon={<MessageSquare size={16} />}>
                                Send Message
                            </Button>

                            <Button variant="outline" fullWidth icon={<FileText size={16} />}>
                                Download Resume
                            </Button>

                            <div className="grid grid-cols-2 gap-3 mt-3">
                                <Button variant="success" icon={<CheckCircle size={16} />}>
                                    Approve
                                </Button>

                                <Button variant="danger" icon={<XCircle size={16} />}>
                                    Reject
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <Card className="p-6">
                        <div className="border-b border-gray-200 mb-6">
                            <div className="flex space-x-4">
                                <button
                                    className={`pb-3 px-4 text-sm font-medium ${
                                        activeTab === "overview"
                                            ? "text-purple-600 border-b-2 border-purple-600"
                                            : "text-black hover:text-purple-700"
                                    }`}
                                    onClick={() => setActiveTab("overview")}
                                >
                                    Overview
                                </button>
                                <button
                                    className={`pb-3 px-4 text-sm font-medium ${
                                        activeTab === "experience"
                                            ? "text-purple-600 border-b-2 border-purple-600"
                                            : "text-black hover:text-purple-700"
                                    }`}
                                    onClick={() => setActiveTab("experience")}
                                >
                                    Experience
                                </button>
                                <button
                                    className={`pb-3 px-4 text-sm font-medium ${
                                        activeTab === "education"
                                            ? "text-purple-600 border-b-2 border-purple-600"
                                            : "text-black hover:text-purple-700"
                                    }`}
                                    onClick={() => setActiveTab("education")}
                                >
                                    Education
                                </button>
                                <button
                                    className={`pb-3 px-4 text-sm font-medium ${
                                        activeTab === "interviews"
                                            ? "text-purple-600 border-b-2 border-purple-600"
                                            : "text-black hover:text-purple-700"
                                    }`}
                                    onClick={() => setActiveTab("interviews")}
                                >
                                    Interviews
                                </button>
                                <button
                                    className={`pb-3 px-4 text-sm font-medium ${
                                        activeTab === "notes"
                                            ? "text-purple-600 border-b-2 border-purple-600"
                                            : "text-black hover:text-purple-700"
                                    }`}
                                    onClick={() => setActiveTab("notes")}
                                >
                                    Notes
                                </button>
                            </div>
                        </div>

                        {activeTab === "overview" && (
                            <div>
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold mb-4 text-black">Summary</h3>
                                    <p className="text-black">
                                        Experienced Frontend Developer with over 5 years of experience in building modern web applications.
                                        Strong proficiency in React.js, JavaScript, and TypeScript. Passionate about creating intuitive user
                                        interfaces and optimizing application performance.
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-bold mb-4 text-black">Key Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {candidate.skills.map((skill) => (
                                            <Badge key={skill.name} variant="primary">
                                                {skill.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-bold mb-4 text-black">Experience Highlights</h3>
                                    <div className="space-y-4">
                                        {candidate.experience.map((exp) => (
                                            <div key={exp.id} className="flex">
                                                <div className="mr-4">
                                                    <div className="p-2 bg-purple-100 rounded-full">
                                                        <Briefcase size={20} className="text-purple-600" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-black">{exp.position}</h4>
                                                    <p className="text-sm text-black">
                                                        {exp.company} • {exp.duration}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold mb-4 text-black">Education & Certifications</h3>
                                    <div className="space-y-4">
                                        {candidate.education.map((edu) => (
                                            <div key={edu.id} className="flex">
                                                <div className="mr-4">
                                                    <div className="p-2 bg-purple-100 rounded-full">
                                                        <GraduationCap size={20} className="text-purple-600" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-black">{edu.degree}</h4>
                                                    <p className="text-sm text-black">
                                                        {edu.institution} • {edu.duration}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}

                                        {candidate.certifications.map((cert) => (
                                            <div key={cert.id} className="flex">
                                                <div className="mr-4">
                                                    <div className="p-2 bg-purple-100 rounded-full">
                                                        <Award size={20} className="text-purple-600" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-black">{cert.name}</h4>
                                                    <p className="text-sm text-black">
                                                        {cert.issuer} • {cert.date}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "experience" && (
                            <div>
                                <h3 className="text-lg font-bold mb-4 text-black">Work Experience</h3>

                                <div className="space-y-6">
                                    {candidate.experience.map((exp) => (
                                        <div key={exp.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                                            <div className="flex items-start">
                                                <div className="p-2 bg-purple-100 rounded-full mr-4">
                                                    <Briefcase size={20} className="text-purple-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-black">{exp.position}</h4>
                                                    <p className="text-black">{exp.company}</p>
                                                    <p className="text-sm text-black mb-3">{exp.duration}</p>
                                                    <p className="text-black">{exp.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "education" && (
                            <div>
                                <h3 className="text-lg font-bold mb-4 text-black">Education</h3>

                                <div className="space-y-6 mb-8">
                                    {candidate.education.map((edu) => (
                                        <div key={edu.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                                            <div className="flex items-start">
                                                <div className="p-2 bg-purple-100 rounded-full mr-4">
                                                    <GraduationCap size={20} className="text-purple-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-black">{edu.degree}</h4>
                                                    <p className="text-black">{edu.institution}</p>
                                                    <p className="text-sm text-black mb-3">{edu.duration}</p>
                                                    <p className="text-black">GPA: {edu.gpa}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <h3 className="text-lg font-bold mb-4 text-black">Certifications</h3>

                                <div className="space-y-6">
                                    {candidate.certifications.map((cert) => (
                                        <div key={cert.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                                            <div className="flex items-start">
                                                <div className="p-2 bg-purple-100 rounded-full mr-4">
                                                    <Award size={20} className="text-purple-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-black">{cert.name}</h4>
                                                    <p className="text-black">{cert.issuer}</p>
                                                    <p className="text-sm text-black">{cert.date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "interviews" && (
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-black">Scheduled Interviews</h3>
                                    <Button variant="outline" size="sm" icon={<Calendar size={16} />}>
                                        Schedule New
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {candidate.interviews.length > 0 ? (
                                        candidate.interviews.map((interview) => (
                                            <Card key={interview.id} className="p-4 border border-gray-200 shadow-sm">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-medium text-black">{interview.type}</h4>
                                                        <div className="space-y-1 mt-2">
                                                            <div className="flex items-center text-sm text-black">
                                                                <Calendar size={16} className="mr-2" />
                                                                {interview.date}
                                                            </div>
                                                            <div className="flex items-center text-sm text-black">
                                                                <Clock size={16} className="mr-2" />
                                                                {interview.time}
                                                            </div>
                                                            <div className="flex items-center text-sm text-black">
                                                                <Video size={16} className="mr-2" />
                                                                {interview.format}
                                                            </div>
                                                            <div className="flex items-center text-sm text-black">
                                                                <User size={16} className="mr-2" />
                                                                {interview.interviewer}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex space-x-2">
                                                        <Button variant="outline" size="sm">
                                                            Reschedule
                                                        </Button>
                                                        <Button variant="primary" size="sm">
                                                            Join
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))
                                    ) : (
                                        <div className="text-center py-8">
                                            <div className="p-3 bg-purple-100 rounded-full inline-block mb-3">
                                                <Calendar size={24} className="text-purple-600" />
                                            </div>
                                            <h4 className="text-black font-medium mb-1">No interviews scheduled</h4>
                                            <p className="text-black mb-4">Schedule an interview with this candidate</p>
                                            <Button variant="outline" size="sm" icon={<Calendar size={16} />}>
                                                Schedule Interview
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6">
                                    <h3 className="text-lg font-bold mb-4 text-black">Interview History</h3>
                                    <div className="text-center py-8 border border-dashed border-gray-300 rounded-md">
                                        <p className="text-black">No previous interviews</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "notes" && (
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-black">Recruiter Notes</h3>
                                    <Button variant="outline" size="sm" icon={<FileText size={16} />}>
                                        Add Note
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {candidate.notes.length > 0 ? (
                                        candidate.notes.map((note) => (
                                            <div key={note.id} className="p-4 border border-gray-200 rounded-lg">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="flex items-center">
                                                        <Avatar src={null} alt={note.author} size="sm" />
                                                        <div className="ml-2">
                                                            <p className="font-medium text-black">{note.author}</p>
                                                            <p className="text-xs text-black">{note.date}</p>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <button className="text-black hover:text-purple-700">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>

                                                <p className="text-black">{note.content}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8">
                                            <div className="p-3 bg-purple-100 rounded-full inline-block mb-3">
                                                <FileText size={24} className="text-purple-600" />
                                            </div>
                                            <h4 className="text-black font-medium mb-1">No notes yet</h4>
                                            <p className="text-black mb-4">Add notes about this candidate</p>
                                            <Button variant="outline" size="sm" icon={<FileText size={16} />}>
                                                Add First Note
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </PageLayout>
    )
}

export default CandidateDetails
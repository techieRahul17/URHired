import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, Plus, Edit, Trash2, Save, Upload, X, Download, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Avatar from '../../components/ui/Avatar';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('personal');
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setProfile({
                id: 1,
                name: 'Rahul Prawin',
                email: 'rahulvs@gmail.com',
                phone: '6383123123',
                location: 'Kelambakkam',
                website: 'rahul.com',
                title: 'Senior Frontend Developer',
                bio: 'Experienced Frontend Developer with over 5 years of experience in building modern web applications. Strong proficiency in React.js, JavaScript, and TypeScript. Passionate about creating intuitive user interfaces and optimizing application performance.',
                skills: [
                    { id: 1, name: 'React.js', level: 95 },
                    { id: 2, name: 'JavaScript', level: 90 },
                    { id: 3, name: 'TypeScript', level: 85 },
                    { id: 4, name: 'HTML/CSS', level: 90 },
                    { id: 5, name: 'Node.js', level: 80 },
                    { id: 6, name: 'Redux', level: 85 }
                ],
                experience: [
                    {
                        id: 1,
                        company: 'Tech Solutions Inc.',
                        position: 'Frontend Developer',
                        location: 'San Francisco, CA',
                        startDate: 'Jan 2022',
                        endDate: 'Present',
                        description: 'Led the development of multiple web applications using React.js, Redux, and TypeScript. Collaborated with designers and backend developers to implement new features and improve user experience.'
                    },
                    {
                        id: 2,
                        company: 'Digital Innovations',
                        position: 'Junior Developer',
                        location: 'New York, NY',
                        startDate: 'Jun 2020',
                        endDate: 'Dec 2021',
                        description: 'Developed and maintained web applications using JavaScript, HTML, and CSS. Worked on bug fixes and small feature implementations.'
                    }
                ],
                education: [
                    {
                        id: 1,
                        institution: 'University of California, Berkeley',
                        degree: 'Bachelor of Science in Computer Science',
                        startDate: '2016',
                        endDate: '2020',
                        gpa: '3.8/4.0'
                    }
                ],
                certifications: [
                    { id: 1, name: 'AWS Certified Developer', issuer: 'Amazon Web Services', date: '2023' },
                    { id: 2, name: 'React Certification', issuer: 'Meta', date: '2022' }
                ],
                languages: [
                    { id: 1, name: 'English', proficiency: 'Native' },
                    { id: 2, name: 'Spanish', proficiency: 'Intermediate' }
                ],
                preferences: {
                    jobTypes: ['Full-time', 'Contract'],
                    locations: ['Remote', 'San Francisco, CA', 'New York, NY'],
                    salary: '$120,000 - $150,000',
                    availability: 'Immediately'
                }
            });

            setLoading(false);
        }, 1500);
    }, []);

    const handleAddSkill = () => {
        // Implementation for adding a skill
        console.log('Add skill');
    };

    const handleAddExperience = () => {
        // Implementation for adding experience
        console.log('Add experience');
    };

    const handleAddEducation = () => {
        // Implementation for adding education
        console.log('Add education');
    };

    const handleAddCertification = () => {
        // Implementation for adding certification
        console.log('Add certification');
    };

    if (loading) {
        return (
            <PageLayout title="My Profile">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout title="My Profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card className="p-6 mb-6">
                        <div className="flex flex-col items-center text-center mb-6 text-black">
                            <div className="relative">
                                <Avatar
                                    src={null}
                                    alt={profile.name}
                                    size="2xl"
                                />
                                <button className="absolute bottom-0 right-0 p-1 bg-purple-600 text-white rounded-full">
                                    <Upload size={16} />
                                </button>
                            </div>

                            <h1 className="text-xl font-bold mt-4 mb-1">{profile.name}</h1>
                            <p className="text-gray-600">{profile.title}</p>

                            <div className="mt-4 w-full">
                                <Button
                                    variant={editMode ? "success" : "primary"}
                                    fullWidth
                                    onClick={() => setEditMode(!editMode)}
                                    icon={editMode ? <Save size={16} /> : <Edit size={16} />}
                                >
                                    {editMode ? 'Save Profile' : 'Edit Profile'}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center text-black">
                                <Mail size={18} className="text-gray-500 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium">{profile.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center text-black">
                                <Phone size={18} className="text-gray-500 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="font-medium">{profile.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-center text-black">
                                <MapPin size={18} className="text-gray-500 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Location</p>
                                    <p className="font-medium">{profile.location}</p>
                                </div>
                            </div>

                            <div className="flex items-center text-black">
                                <Globe size={18} className="text-gray-500 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Website</p>
                                    <p className="font-medium">{profile.website}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex justify-between items-center mb-4 text-black">
                                <h3 className="font-medium">Skills</h3>
                                {editMode && (
                                    <Button variant="ghost" size="sm" icon={<Plus size={16} />} onClick={handleAddSkill}>
                                        Add
                                    </Button>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {profile.skills.map((skill) => (
                                    <div key={skill.id} className="relative">
                                        <Badge variant="primary">
                                            {skill.name}
                                            {editMode && (
                                                <button className="ml-1 text-purple-300 hover:text-purple-100">
                                                    <X size={14} />
                                                </button>
                                            )}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex justify-between items-center mb-4 text-black">
                                <h3 className="font-medium">Languages</h3>
                                {editMode && (
                                    <Button variant="ghost" size="sm" icon={<Plus size={16} />}>
                                        Add
                                    </Button>
                                )}
                            </div>

                            <div className="space-y-2">
                                {profile.languages.map((language) => (
                                    <div key={language.id} className="flex justify-between items-center text-black">
                                        <span>{language.name}</span>
                                        <Badge variant="secondary" size="sm">{language.proficiency}</Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="font-medium mb-4">Job Preferences</h3>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Job Types</p>
                                <div className="flex flex-wrap gap-2">
                                    {profile.preferences.jobTypes.map((type, index) => (
                                        <Badge key={index} variant="secondary">{type}</Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-1">Preferred Locations</p>
                                <div className="flex flex-wrap gap-2">
                                    {profile.preferences.locations.map((location, index) => (
                                        <Badge key={index} variant="secondary">{location}</Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-1">Expected Salary</p>
                                <p className="font-medium text-black">{profile.preferences.salary}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-1">Availability</p>
                                <p className="font-medium text-black">{profile.preferences.availability}</p>
                            </div>

                            {editMode && (
                                <Button variant="outline" fullWidth icon={<Edit size={16} />}>
                                    Edit Preferences
                                </Button>
                            )}
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <Card className="p-6">
                        <div className="border-b border-gray-200 mb-6">
                            <div className="flex space-x-4 text-black">
                                <button
                                    className={`pb-3 px-4 text-sm font-medium text-black ${
                                        activeTab === 'personal'
                                            ? 'text-purple-600 border-b-2 border-purple-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                    onClick={() => setActiveTab('personal')}
                                >
                                    Personal Info
                                </button>
                                <button
                                    className={`pb-3 px-4 text-sm font-medium ${
                                        activeTab === 'experience'
                                            ? 'text-purple-600 border-b-2 border-purple-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                    onClick={() => setActiveTab('experience')}
                                >
                                    Experience
                                </button>
                                <button
                                    className={`pb-3 px-4 text-sm font-medium ${
                                        activeTab === 'education'
                                            ? 'text-purple-600 border-b-2 border-purple-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                    onClick={() => setActiveTab('education')}
                                >
                                    Education
                                </button>
                                <button
                                    className={`pb-3 px-4 text-sm font-medium ${
                                        activeTab === 'resume'
                                            ? 'text-purple-600 border-b-2 border-purple-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                    onClick={() => setActiveTab('resume')}
                                >
                                    Resume
                                </button>
                            </div>
                        </div>

                        {activeTab === 'personal' && (
                            <div>
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold mb-4 text-black">About Me</h3>
                                    {editMode ? (
                                        <textarea
                                            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 min-h-[150px]"
                                            defaultValue={profile.bio}
                                        />
                                    ) : (
                                        <p className="text-gray-700">{profile.bio}</p>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-4 text-black">
                                        <h3 className="text-lg font-bold">Skills</h3>
                                        {editMode && (
                                            <Button variant="outline" size="sm" icon={<Plus size={16} />} onClick={handleAddSkill}>
                                                Add Skill
                                            </Button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
                                        {profile.skills.map((skill) => (
                                            <div key={skill.id} className="relative">
                                                {editMode ? (
                                                    <div className="flex items-center space-x-2">
                                                        <Input
                                                            value={skill.name}
                                                            className="flex-grow"
                                                        />
                                                        <Input
                                                            type="number"
                                                            value={skill.level}
                                                            className="w-20"
                                                        />
                                                        <button className="text-red-500 hover:text-red-700">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-sm font-medium">{skill.name}</span>
                                                            <span className="text-sm font-medium">{skill.level}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full"
                                                                style={{ width: `${skill.level}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'experience' && (
                            <div>
                                <div className="flex justify-between items-center mb-6 text-black">
                                    <h3 className="text-lg font-bold">Work Experience</h3>
                                    {editMode && (
                                        <Button variant="outline" size="sm" icon={<Plus size={16} />} onClick={handleAddExperience}>
                                            Add Experience
                                        </Button>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    {profile.experience.map((exp) => (
                                        <div key={exp.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                                            {editMode ? (
                                                <div className="space-y-4">
                                                    <div className="flex justify-between">
                                                        <Input
                                                            label="Position"
                                                            value={exp.position}
                                                            className="flex-grow mr-2"
                                                        />
                                                        <button className="text-red-500 hover:text-red-700 self-end mb-4">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                    <Input
                                                        label="Company"
                                                        value={exp.company}
                                                    />
                                                    <Input
                                                        label="Location"
                                                        value={exp.location}
                                                    />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <Input
                                                            label="Start Date"
                                                            value={exp.startDate}
                                                        />
                                                        <Input
                                                            label="End Date"
                                                            value={exp.endDate}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Description
                                                        </label>
                                                        <textarea
                                                            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 min-h-[100px]"
                                                            defaultValue={exp.description}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-start">
                                                    <div className="p-2 bg-purple-100 rounded-full mr-4">
                                                        <Briefcase size={20} className="text-purple-600" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900">{exp.position}</h4>
                                                        <p className="text-gray-600">{exp.company} • {exp.location}</p>
                                                        <p className="text-sm text-gray-500 mb-3">{exp.startDate} - {exp.endDate}</p>
                                                        <p className="text-gray-700">{exp.description}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'education' && (
                            <div>
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-6 text-black">
                                        <h3 className="text-lg font-bold">Education</h3>
                                        {editMode && (
                                            <Button variant="outline" size="sm" icon={<Plus size={16} />} onClick={handleAddEducation}>
                                                Add Education
                                            </Button>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        {profile.education.map((edu) => (
                                            <div key={edu.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                                                {editMode ? (
                                                    <div className="space-y-4">
                                                        <div className="flex justify-between">
                                                            <Input
                                                                label="Degree"
                                                                value={edu.degree}
                                                                className="flex-grow mr-2"
                                                            />
                                                            <button className="text-red-500 hover:text-red-700 self-end mb-4">
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                        <Input
                                                            label="Institution"
                                                            value={edu.institution}
                                                        />
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <Input
                                                                label="Start Date"
                                                                value={edu.startDate}
                                                            />
                                                            <Input
                                                                label="End Date"
                                                                value={edu.endDate}
                                                            />
                                                        </div>
                                                        <Input
                                                            label="GPA"
                                                            value={edu.gpa}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex items-start">
                                                        <div className="p-2 bg-purple-100 rounded-full mr-4">
                                                            <GraduationCap size={20} className="text-purple-600" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                                                            <p className="text-gray-600">{edu.institution}</p>
                                                            <p className="text-sm text-gray-500 mb-3">{edu.startDate} - {edu.endDate}</p>
                                                            <p className="text-gray-700">GPA: {edu.gpa}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-6 text-black">
                                        <h3 className="text-lg font-bold">Certifications</h3>
                                        {editMode && (
                                            <Button variant="outline" size="sm" icon={<Plus size={16} />} onClick={handleAddCertification}>
                                                Add Certification
                                            </Button>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        {profile.certifications.map((cert) => (
                                            <div key={cert.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                                                {editMode ? (
                                                    <div className="space-y-4">
                                                        <div className="flex justify-between">
                                                            <Input
                                                                label="Certification Name"
                                                                value={cert.name}
                                                                className="flex-grow mr-2"
                                                            />
                                                            <button className="text-red-500 hover:text-red-700 self-end mb-4">
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                        <Input
                                                            label="Issuing Organization"
                                                            value={cert.issuer}
                                                        />
                                                        <Input
                                                            label="Date"
                                                            value={cert.date}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex items-start">
                                                        <div className="p-2 bg-purple-100 rounded-full mr-4">
                                                            <Award size={20} className="text-purple-600" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-gray-900">{cert.name}</h4>
                                                            <p className="text-gray-600">{cert.issuer}</p>
                                                            <p className="text-sm text-gray-500">{cert.date}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'resume' && (
                            <div>
                                <div className="flex justify-between items-center mb-6 text-black">
                                    <h3 className="text-lg font-bold">Resume</h3>
                                    <div className="flex space-x-3">
                                        <Button variant="outline" size="sm" icon={<Upload size={16} />}>
                                            Upload New
                                        </Button>
                                        <Button variant="primary" size="sm" icon={<Download size={16} />}>
                                            Download
                                        </Button>
                                    </div>
                                </div>

                                <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                                    <div className="p-4 bg-purple-100 rounded-full mb-4">
                                        <FileText size={32} className="text-purple-600" />
                                    </div>
                                    <h4 className="text-lg font-medium text-gray-900 mb-1">John_Doe_Resume.pdf</h4>
                                    <p className="text-gray-500 mb-4">Uploaded on March 15, 2025</p>

                                    <div className="w-full max-w-md bg-gray-100 rounded-lg p-4 mt-4">
                                        <p className="text-sm text-gray-600 mb-2">AI Resume Analysis:</p>
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <CheckCircle size={16} className="text-green-500 mr-2" />
                                                <span className="text-sm text-black">Strong technical skills highlighted</span>
                                            </div>
                                            <div className="flex items-center">
                                                <CheckCircle size={16} className="text-green-500 mr-2" />
                                                <span className="text-sm text-black">Clear work experience section</span>
                                            </div>
                                            <div className="flex items-center">
                                                <AlertCircle size={16} className="text-yellow-500 mr-2" />
                                                <span className="text-sm text-black">Consider adding more quantifiable achievements</span>
                                            </div>
                                            <div className="flex items-center">
                                                <AlertCircle size={16} className="text-yellow-500 mr-2" />
                                                <span className="text-sm text-black">Resume could be more ATS-friendly</span>
                                            </div>
                                        </div>

                                        <Button variant="outline" size="sm" className="mt-4" fullWidth>
                                            View Full Analysis
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </PageLayout>
    );
};

export default Profile;

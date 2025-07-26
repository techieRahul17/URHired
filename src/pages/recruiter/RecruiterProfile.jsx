import { useState, useEffect } from 'react';
import { Upload, Edit, Save, Mail, Phone, MapPin, Globe, Building2, Briefcase, Plus, X, Trash2 } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';

const RecruiterProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProfile({
        id: 1,
        name: 'Nitya Sharma',
        email: 'nitya.hr@company.com',
        phone: '9876543210',
        location: 'Bangalore, India',
        website: 'www.company.com',
        company: 'TalentSeekers Pvt Ltd',
        position: 'Lead Technical Recruiter',
        bio: 'I help top companies find exceptional talent. Passionate about connecting the right people to the right roles.',
        hiringFields: ['Frontend Developer', 'Backend Developer', 'Data Scientist'],
        hiringLocations: ['Remote', 'Bangalore', 'Hyderabad']
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddField = () => console.log('Add field');
  const handleAddLocation = () => console.log('Add location');

  if (loading) {
    return (
      <PageLayout title="Recruiter Profile">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Recruiter Profile">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-6 text-black">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <Avatar src={null} alt={profile.name} size="2xl" />
                <button className="absolute bottom-0 right-0 p-1 bg-purple-600 text-white rounded-full">
                  <Upload size={16} />
                </button>
              </div>

              <h1 className="text-xl font-bold mt-4">{profile.name}</h1>
              <p className="text-gray-600">{profile.position}</p>
              <p className="text-sm text-gray-500">{profile.company}</p>

              <Button
                variant={editMode ? 'success' : 'primary'}
                fullWidth
                className="mt-4"
                onClick={() => setEditMode(!editMode)}
                icon={editMode ? <Save size={16} /> : <Edit size={16} />}
              >
                {editMode ? 'Save Profile' : 'Edit Profile'}
              </Button>
            </div>

            <div className="mt-6 space-y-4">
              <InfoItem icon={Mail} label="Email" value={profile.email} />
              <InfoItem icon={Phone} label="Phone" value={profile.phone} />
              <InfoItem icon={MapPin} label="Location" value={profile.location} />
              <InfoItem icon={Globe} label="Website" value={profile.website} />
              <InfoItem icon={Building2} label="Company" value={profile.company} />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="p-6 text-black">
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">About Me</h3>
              {editMode ? (
                <textarea
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-purple-300"
                  defaultValue={profile.bio}
                />
              ) : (
                <p className="text-gray-700">{profile.bio}</p>
              )}
            </div>

            {/* Hiring Fields */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold">Hiring Roles</h3>
                {editMode && (
                  <Button variant="ghost" size="sm" icon={<Plus size={16} />} onClick={handleAddField}>
                    Add
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.hiringFields.map((field, index) => (
                  <Badge key={index} variant="primary">
                    {field}
                    {editMode && (
                      <button className="ml-1 text-purple-300 hover:text-purple-100">
                        <X size={14} />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Preferred Locations */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold">Preferred Hiring Locations</h3>
                {editMode && (
                  <Button variant="ghost" size="sm" icon={<Plus size={16} />} onClick={handleAddLocation}>
                    Add
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.hiringLocations.map((location, index) => (
                  <Badge key={index} variant="secondary">
                    {location}
                    {editMode && (
                      <button className="ml-1 text-purple-300 hover:text-purple-100">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center text-black">
    <Icon size={18} className="text-gray-500 mr-3" />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default RecruiterProfile;

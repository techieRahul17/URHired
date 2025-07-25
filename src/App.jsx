import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RecruiterDashboard from './pages/recruiter/Dashboard';
import RecruiterJobs from './pages/recruiter/Jobs';
import RecruiterJobDetails from './pages/recruiter/JobDetails';
import RecruiterApplications from './pages/recruiter/Applications';
import RecruiterInterviews from './pages/recruiter/Interviews';
import RecruiterCandidateDetails from './pages/recruiter/CandidateDetails';
import UserDashboard from './pages/user/Dashboard';
import UserJobs from './pages/user/Jobs';
import UserApplications from './pages/user/Applications';
import UserInterviews from './pages/user/Interviews';
import UserProfile from './pages/user/Profile';
import NotFound from './pages/NotFound';
import ThemeToggle from './components/ThemeToggle';

function App() {
    return (
        <AuthProvider>
            <Router>
                {/* Root wrapper that responds to dark mode */}
                <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
                    {/* Floating Theme Toggle */}
                    <div className="fixed top-4 right-4 z-[9999] pointer-events-auto">
                        <ThemeToggle />
                    </div>

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Recruiter Routes */}
                        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
                        <Route path="/recruiter/jobs" element={<RecruiterJobs />} />
                        <Route path="/recruiter/jobs/:id" element={<RecruiterJobDetails />} />
                        <Route path="/recruiter/applications" element={<RecruiterApplications />} />
                        <Route path="/recruiter/interviews" element={<RecruiterInterviews />} />
                        <Route path="/recruiter/candidates/:id" element={<RecruiterCandidateDetails />} />

                        {/* User Routes */}
                        <Route path="/user/dashboard" element={<UserDashboard />} />
                        <Route path="/user/jobs" element={<UserJobs />} />
                        <Route path="/user/applications" element={<UserApplications />} />
                        <Route path="/user/interviews" element={<UserInterviews />} />
                        <Route path="/user/profile" element={<UserProfile />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;

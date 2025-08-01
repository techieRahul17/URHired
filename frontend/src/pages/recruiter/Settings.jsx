"use client"

import { useState } from "react"
import { Save, Edit, Home, Briefcase, FileText, Calendar, Settings as SettingsIcon, LogOut, Search, Bell } from "lucide-react"
import { NavLink } from "react-router-dom"
import PageLayout from "../../components/layout/PageLayout"

function Input({ label, className, ...props }) {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium mb-2 text-gray-700">{label}</label>}
      <input
        {...props}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 ${className || ""}`}
      />
    </div>
  )
}

function Button({ children, onClick, icon, variant = "primary", ...props }) {
  const baseClasses = "flex items-center px-4 py-2 rounded-md font-medium transition-colors"
  const variants = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    outline: "border border-gray-300 hover:bg-gray-50 text-gray-700",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]}`} onClick={onClick} {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
}

function Switch({ checked, onChange, disabled }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} className="sr-only" />
      <div
        className={`w-11 h-6 rounded-full transition-colors ${checked ? "bg-purple-600" : "bg-gray-300"} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${checked ? "translate-x-5" : "translate-x-0"} mt-0.5 ml-0.5`}
        ></div>
      </div>
    </label>
  )
}

const initialSettings = {
  company: {
    name: "Acme Corp",
    website: "https://acme.com",
    industry: "Technology",
    size: "201-500",
    location: "San Francisco, CA",
    description: "Leading provider of AI-powered solutions.",
  },
  account: {
    name: "Jane Doe",
    email: "jane@acme.com",
    phone: "123-456-7890",
  },
  notifications: {
    newApplications: true,
    interviewReminders: true,
    newsletter: false,
  },
  password: {
    current: "",
    new: "",
    confirm: "",
  },
}

const sidebarItems = [
  { icon: Home, label: "Dashboard", to: "/recruiter/dashboard" },
  { icon: Briefcase, label: "Jobs", to: "/recruiter/jobs" },
  { icon: FileText, label: "Applications", to: "/recruiter/applications" },
  { icon: Calendar, label: "Interviews", to: "/recruiter/interviews" },
  { icon: SettingsIcon, label: "Settings", to: "/recruiter/settings" },
]

export default function RecruiterSettings() {
  const [settings, setSettings] = useState(initialSettings)
  const [editMode, setEditMode] = useState(false)

  const handleChange = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleSwitch = (field) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: !prev.notifications[field],
      },
    }))
  }

  const handleSave = () => {
    setEditMode(false)
    alert("Settings saved!")
  }

  const sidebar = (
    <div className="h-full flex flex-col">
      <div className="px-6 py-6 border-b">
        <div>
          <div className="text-xl font-bold text-purple-700">AI Recruiter</div>
          <div className="text-xs text-gray-400">HR Portal</div>
        </div>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `group flex items-center px-4 py-2 rounded-md text-sm font-medium transition ${
                isActive
                  ? "bg-purple-50 text-purple-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-purple-700"
              }`
            }
            end
          >
            <item.icon
              className={`
                mr-3 h-5 w-5
                ${
                  window.location.pathname === item.to
                    ? "text-purple-700"
                    : "text-gray-400 group-hover:text-purple-700"
                }
              `}
            />
            {item.label}
          </NavLink>
        ))}
        <NavLink
          to="/logout"
          className="group flex items-center px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-purple-700 mt-4"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-purple-700" />
          Logout
        </NavLink>
      </nav>
    </div>
  )

  return (
    <PageLayout title="Settings" sidebar={sidebar}>
      {/* Header */}
      {/* Settings Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Account Settings</h2>
            <Button
              icon={editMode ? <Save size={16} /> : <Edit size={16} />}
              variant={editMode ? "success" : "primary"}
              onClick={editMode ? handleSave : () => setEditMode(true)}
            >
              {editMode ? "Save Changes" : "Edit Settings"}
            </Button>
          </div>
        </div>
        <div className="p-6 space-y-8">
          {/* Company Information */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Company Name"
                value={settings.company.name}
                disabled={!editMode}
                onChange={e => handleChange("company", "name", e.target.value)}
              />
              <Input
                label="Website"
                value={settings.company.website}
                disabled={!editMode}
                onChange={(e) => handleChange("company", "website", e.target.value)}
              />
              <Input
                label="Industry"
                value={settings.company.industry}
                disabled={!editMode}
                onChange={(e) => handleChange("company", "industry", e.target.value)}
              />
              <Input
                label="Company Size"
                value={settings.company.size}
                disabled={!editMode}
                onChange={(e) => handleChange("company", "size", e.target.value)}
              />
              <Input
                label="Location"
                value={settings.company.location}
                disabled={!editMode}
                onChange={(e) => handleChange("company", "location", e.target.value)}
              />
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2 text-gray-700">Company Description</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                rows={4}
                value={settings.company.description}
                disabled={!editMode}
                onChange={(e) => handleChange("company", "description", e.target.value)}
              />
            </div>
          </section>
          <hr className="border-gray-200" />
          {/* Personal Information */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                value={settings.account.name}
                disabled={!editMode}
                onChange={(e) => handleChange("account", "name", e.target.value)}
              />
              <Input
                label="Email Address"
                type="email"
                value={settings.account.email}
                disabled={!editMode}
                onChange={(e) => handleChange("account", "email", e.target.value)}
              />
              <Input
                label="Phone Number"
                value={settings.account.phone}
                disabled={!editMode}
                onChange={(e) => handleChange("account", "phone", e.target.value)}
              />
            </div>
          </section>
          <hr className="border-gray-200" />
          {/* Notification Preferences */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium text-gray-900">New Job Applications</div>
                  <div className="text-sm text-gray-500">
                    Get notified when candidates apply to your job postings
                  </div>
                </div>
                <Switch
                  checked={settings.notifications.newApplications}
                  disabled={!editMode}
                  onChange={() => handleSwitch("newApplications")}
                />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium text-gray-900">Interview Reminders</div>
                  <div className="text-sm text-gray-500">Receive reminders about upcoming interviews</div>
                </div>
                <Switch
                  checked={settings.notifications.interviewReminders}
                  disabled={!editMode}
                  onChange={() => handleSwitch("interviewReminders")}
                />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium text-gray-900">Newsletter Subscription</div>
                  <div className="text-sm text-gray-500">Stay updated with our latest features and tips</div>
                </div>
                <Switch
                  checked={settings.notifications.newsletter}
                  disabled={!editMode}
                  onChange={() => handleSwitch("newsletter")}
                />
              </div>
            </div>
          </section>
          <hr className="border-gray-200" />
          {/* Security */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Security</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Current Password"
                type="password"
                value={settings.password.current}
                disabled={!editMode}
                onChange={(e) => handleChange("password", "current", e.target.value)}
              />
              <Input
                label="New Password"
                type="password"
                value={settings.password.new}
                disabled={!editMode}
                onChange={(e) => handleChange("password", "new", e.target.value)}
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={settings.password.confirm}
                disabled={!editMode}
                onChange={(e) => handleChange("password", "confirm", e.target.value)}
              />
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}

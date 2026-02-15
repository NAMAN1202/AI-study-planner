import React, { useState, useEffect } from 'react';
import { LayoutDashboard, BookOpen, Calendar, Settings, Plus, BrainCircuit, Search, MoreVertical } from 'lucide-react';

// IMPORTANT: Replace this with your backend URL after you deploy the backend
const BACKEND_URL = "http://localhost:5000"; 

export default function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/notes`)
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.log("Backend not connected yet. using mock data."));
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* SIDEBAR - Matches Figma Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full border-r border-slate-800">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg"><BrainCircuit size={24} /></div>
          <span className="text-xl font-bold tracking-tight">StudyAI</span>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" />
          <NavItem icon={<BookOpen size={20}/>} label="Notes" active />
          <NavItem icon={<Calendar size={20}/>} label="Schedule" />
          <NavItem icon={<Settings size={20}/>} label="Settings" />
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="ml-64 flex-1 p-10">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">My Study Notes</h1>
            <p className="text-slate-500 mt-1">Organize your academic life with AI power.</p>
          </div>
          <div className="flex gap-4">
             <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-64" placeholder="Search notes..." />
             </div>
             <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-blue-200">
                <Plus size={20} /> New Note
             </button>
          </div>
        </header>

        {/* AI Action Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 mb-10 text-white shadow-xl flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Generate Exam Study Plan</h2>
            <p className="text-blue-100 opacity-90">Upload your syllabus and let AI create your perfect 30-day schedule.</p>
          </div>
          <button className="bg-white text-blue-700 px-6 py-3 rounded-2xl font-bold hover:bg-blue-50 transition-colors">Start AI Planner</button>
        </div>

        {/* Notes Grid - Matches Figma Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.length > 0 ? notes.map(note => (
            <div key={note.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">{note.tag}</span>
                <MoreVertical size={18} className="text-slate-400 group-hover:text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600">{note.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{note.content}</p>
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400 font-medium uppercase tracking-wider">
                <span>Created 2 days ago</span>
                <span className="text-blue-500">View Full Note →</span>
              </div>
            </div>
          )) : <p>Loading your study materials...</p>}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
      {icon}
      <span className="font-semibold">{label}</span>
    </div>
  );
}

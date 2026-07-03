import React, { useState, useEffect } from 'react';
import { Layout, Building2, Calendar, ChevronRight, ChevronLeft, FileText, Clock, MapPin, Info, GraduationCap, Phone, Target, Users, AlertCircle, ImageIcon, Menu, Sun, Moon } from 'lucide-react';
import { internshipWeeks, internshipProfile, organizationInfo } from './data/reports';

const StatsBar = ({ location, hours, workingHours, mapsUrl, isDark }) => {
  const cardClass = isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-300 shadow-sm";
  const titleClass = isDark ? "text-slate-400 font-medium" : "text-slate-700 font-bold";
  const valueClass = isDark ? "text-white" : "text-slate-900";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={`p-5 rounded-xl border flex items-center gap-4 hover:border-blue-600 transition-all group ${cardClass}`}>
        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600"><MapPin size={24} /></div>
        <div>
          <p className={`text-xs uppercase tracking-wider ${titleClass}`}>Venue Map (MEA)</p>
          <p className={`text-sm font-black uppercase ${valueClass}`}>{location}</p>
        </div>
      </a>
      <div className={`p-5 rounded-xl border flex items-center gap-4 ${cardClass}`}>
        <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600"><Calendar size={24} /></div>
        <div>
          <p className={`text-xs uppercase tracking-wider ${titleClass}`}>Time Schedule</p>
          <p className={`text-base font-black uppercase ${valueClass}`}>{workingHours}</p>
        </div>
      </div>
      <div className={`p-5 rounded-xl border flex items-center gap-4 ${cardClass}`}>
        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600"><Clock size={24} /></div>
        <div>
          <p className={`text-xs uppercase tracking-wider ${titleClass}`}>Required Hours</p>
          <p className={`text-xl font-black ${valueClass}`}>{hours} HRS</p>
        </div>
      </div>
    </div>
  );
};

const TimesheetTable = ({ tasks, isDark }) => {
  const tableWrapperClass = isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-300 shadow-sm";
  const headerClass = isDark ? "border-slate-800 bg-slate-950 text-slate-100" : "border-slate-300 bg-slate-200 text-slate-900 font-black";
  const textClass = isDark ? "text-slate-200" : "text-slate-900 font-medium";
  const dateClass = isDark ? "text-sky-400" : "text-blue-800 font-bold";

  return (
    <div className={`rounded-xl border overflow-hidden ${tableWrapperClass}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className={`border-b-2 ${headerClass}`}>
              <th className="p-4 text-sm font-bold uppercase tracking-wider w-44 text-center border-r border-slate-700/30">วันที่ทำงาน</th>
              <th className="p-4 text-sm font-bold uppercase tracking-wider">รายละเอียดภาระงานและกิจกรรมที่ปฏิบัติ</th>
              <th className="p-4 text-sm font-bold uppercase tracking-wider w-32 text-center">รูปแบบงาน</th>
            </tr>
          </thead>
          <tbody className={isDark ? "divide-y divide-slate-800" : "divide-y divide-slate-300"}>
            {tasks.map((item, i) => {
              const isWfh = /\[\s*WFH\s*\]/i.test(item.task);
              const isHoliday = item.task.includes('วันหยุด') || item.task.includes('หยุดราชการ');
              const cleanTaskText = item.task.replace(/\[\s*WFH\s*\]/i, '').trim();
              
              const rowClass = isHoliday 
                ? (isDark ? "bg-amber-500/5 hover:bg-amber-500/10 transition-colors" : "bg-amber-50 hover:bg-amber-100/70 transition-colors")
                : (isDark ? "hover:bg-slate-800/60 transition-colors" : "hover:bg-slate-100/80 transition-colors");

              return (
                <tr key={i} className={rowClass}>
                  <td className={`p-4 text-base font-bold text-center whitespace-nowrap border-r border-slate-700/20 ${isHoliday ? 'text-amber-500 animate-pulse duration-1000' : dateClass}`}>{item.date}</td>
                  <td className={`p-4 text-base leading-relaxed ${isHoliday ? (isDark ? 'text-amber-400 font-bold' : 'text-amber-900 font-black') : textClass}`}>{cleanTaskText}</td>
                  <td className="p-4 text-center whitespace-nowrap">
                    {isWfh ? (
                      <span className="text-xs font-black bg-blue-500/10 text-blue-600 px-3 py-1.5 rounded border border-blue-500/30">WFH</span>
                    ) : isHoliday ? (
                      <span className="text-xs font-black bg-amber-500/10 text-amber-600 px-3 py-1.5 rounded border border-amber-500/30">HOLIDAY</span>
                    ) : (
                      <span className="text-xs font-black bg-emerald-500/10 text-emerald-600 px-3 py-1.5 rounded border border-emerald-500/30">ON-SITE</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const OrgChart = ({ chartData, isDark }) => {
  const containerClass = isDark ? "bg-slate-900/40 border-slate-800" : "bg-slate-100 border-slate-300";
  const headerClass = isDark ? "text-slate-400" : "text-slate-800 font-black";
  const cardClass = isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-400 shadow-sm";
  const roleClass = isDark ? "text-sky-400" : "text-blue-800 font-black";
  const nameClass = isDark ? "text-white" : "text-slate-900 font-bold";

  return (
    <div className={`p-6 md:p-12 rounded-2xl border shadow-inner ${containerClass}`}>
      <h3 className={`text-sm font-black uppercase tracking-[0.3em] mb-12 text-center flex justify-center gap-3 underline underline-offset-8 ${headerClass}`}>
        <Users size={18} /> INTERNSHIP OPERATIONS STRUCTURE
      </h3>
      <div className="flex flex-col items-center gap-6">
        {chartData.map((m, idx) => (
          <React.Fragment key={idx}>
            <div className={`p-6 rounded-xl text-center w-full max-w-md border transition-all ${cardClass}`}>
              <p className={`text-xs font-black uppercase mb-1 tracking-[0.2em] ${roleClass}`}>{m.role}</p>
              <p className={`font-bold text-lg uppercase tracking-tight ${nameClass}`}>{m.name}</p>
            </div>
            {idx < chartData.length - 1 && <div className={isDark ? "text-slate-700 text-sm" : "text-slate-500 text-sm"}>▼</div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

function App() {
  const [isDark, setIsDark] = useState(true);
  const [activePage, setActivePage] = useState('weekly');
  const [selectedWeek, setSelectedWeek] = useState(internshipWeeks[0]);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setCurrentImgIdx(0);
  }, [selectedWeek]);

  const mainBgClass = isDark ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900";
  const sidebarBgClass = isDark ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-300";
  const cardBgClass = isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-300 shadow-sm";
  const textMutedClass = isDark ? "text-slate-300" : "text-slate-800 font-bold";
  const headingClass = isDark ? "text-white" : "text-slate-900 font-black";

  return (
    <div className={`flex flex-col md:flex-row h-screen font-sans overflow-hidden ${mainBgClass}`}>
      <div className={`md:hidden border-b p-4 flex items-center justify-between z-50 ${sidebarBgClass}`}>
        <h1 className="text-lg font-black text-blue-600 uppercase tracking-wider flex items-center gap-2">
          <Layout size={20} /> Internship Report
        </h1>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-xl border ${isDark ? 'border-slate-700 text-amber-400' : 'border-slate-400 text-blue-900 bg-white'}`}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className={isDark ? "p-2 text-slate-400" : "p-2 text-slate-900"}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      <aside className={`fixed md:relative top-0 left-0 h-full w-80 border-r flex flex-col shrink-0 z-40 transform transition-transform duration-300 md:transform-none ${sidebarBgClass} ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b flex items-center justify-between hidden md:flex">
          <h1 className="text-xl font-black text-blue-700 flex items-center gap-2 uppercase">
            <Layout size={24} /> Internship Report
          </h1>
          <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-xl border transition-all ${isDark ? 'border-slate-800 text-amber-400 bg-slate-950' : 'border-slate-400 text-blue-950 bg-white shadow-sm'}`}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 pt-20 md:pt-4">
          <button onClick={() => { setActivePage('weekly'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activePage === 'weekly' ? (isDark ? 'bg-slate-800 text-white border border-slate-700 font-black' : 'bg-blue-800 text-white shadow-md font-black') : (isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-800 hover:bg-slate-200 font-bold')}`}>
            <Calendar size={18} /> <span className="text-sm font-semibold uppercase tracking-widest">WEEKLY LOGBOOK</span>
          </button>
          <button onClick={() => { setActivePage('org'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activePage === 'org' ? (isDark ? 'bg-emerald-600 text-white font-black' : 'bg-emerald-800 text-white shadow-md font-black') : (isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-800 hover:bg-slate-200 font-bold')}`}>
            <Building2 size={18} /> <span className="text-sm font-semibold uppercase tracking-widest">VENUE INFO</span>
          </button>
          <div className="pt-6 px-4 py-2 text-xs font-black uppercase tracking-widest border-t border-slate-400/40 mt-4 text-slate-500">LOG LIST</div>
          {activePage === 'weekly' && internshipWeeks.map((w) => (
            <button key={w.week} onClick={() => { setSelectedWeek(w); setSidebarOpen(false); }} className={`w-full flex items-center justify-between pl-8 pr-4 py-3 rounded-xl text-sm transition-all ${selectedWeek.week === w.week ? (isDark ? 'bg-sky-500/10 text-sky-400 font-black' : 'bg-blue-100 text-blue-900 font-black border-2 border-blue-400') : (isDark ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-900 font-bold hover:bg-slate-200')}`}>
              <span>WEEK {w.week}</span>
              {selectedWeek.week === w.week && <ChevronRight size={14} />}
            </button>
          ))}
        </nav>
      </aside>

      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-30 md:hidden" />}

      <main className="flex-1 overflow-y-auto p-4 md:p-10 relative">
        <div className="max-w-5xl mx-auto">
          <StatsBar location={organizationInfo.location} hours={organizationInfo.totalRequiredHours} workingHours={organizationInfo.workingHours} mapsUrl={organizationInfo.googleMapsUrl} isDark={isDark} />

          {activePage === 'weekly' ? (
            <div className="animate-in fade-in duration-500 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className={`lg:col-span-2 p-6 md:p-8 rounded-xl border flex gap-6 items-center ${cardBgClass}`}>
                  <div className="hidden sm:block p-5 rounded-xl bg-blue-500/10 text-blue-600"><GraduationCap size={44} /></div>
                  <div>
                    <h3 className="text-xs font-black text-blue-600 browser-default uppercase tracking-[0.2em] mb-1">Intern Profile</h3>
                    <h2 className={`text-xl md:text-3xl font-black uppercase tracking-tighter ${headingClass}`}>{internshipProfile.name}</h2>
                    <p className={`text-sm mt-1 uppercase tracking-widest ${textMutedClass}`}>{internshipProfile.department} | {internshipProfile.university}</p>
                  </div>
                </div>
                <button onClick={() => setActivePage('org')} className={`p-6 md:p-8 rounded-xl border hover:border-emerald-600 transition-all text-left group flex flex-col justify-between gap-4 ${cardBgClass}`}>
                  <h3 className="text-xs font-black text-emerald-600 uppercase tracking-widest flex justify-between w-full">ORG INFO <ChevronRight size={14} /></h3>
                  <div>
                    <p className={`text-base font-black mb-1 ${headingClass}`}>{organizationInfo.name}</p>
                    <p className={`text-xs uppercase font-mono tracking-tighter ${textMutedClass}`}>หน่วยฝึกอบรม (ชั้น 8)</p>
                  </div>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b pb-4 border-slate-400/40">
                <h2 className={`text-2xl md:text-4xl font-black uppercase font-mono ${headingClass}`}>WEEK {selectedWeek.week}</h2>
                <p className={`font-mono text-xs md:text-sm tracking-widest border px-4 py-1.5 rounded-md shadow-inner ${isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-200 border-slate-400 text-slate-900 font-black'}`}>{selectedWeek.date}</p>
              </div>

              {selectedWeek.holiday && (
                <div className={`p-5 rounded-xl border flex items-center gap-4 ${isDark ? 'bg-amber-500/5 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-400 text-slate-900 shadow-sm'}`}>
                  <div className="p-2 bg-amber-500/20 rounded-lg text-amber-600"><Info size={24} /></div>
                  <div className="text-base font-bold">หยุดวันที่ {selectedWeek.holiday.date} เนื่องจาก <span className="text-amber-600 font-black">{selectedWeek.holiday.name}</span></div>
                </div>
              )}

              <div className={`p-6 md:p-8 rounded-xl border shadow-sm ${cardBgClass}`}>
                <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2"><Layout size={14} /> สรุปกิจกรรมประจำสัปดาห์</h3>
                <p className={`text-base leading-relaxed font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{selectedWeek.description}</p>
              </div>

              <TimesheetTable tasks={selectedWeek.dailyTasks} isDark={isDark} />

              <div className="bg-red-500/5 border border-red-500/20 p-6 md:p-8 rounded-xl">
                <h3 className="text-xs font-black text-red-600 uppercase tracking-widest mb-6 flex items-center gap-2"><AlertCircle size={14} /> ปัญหาที่พบและการแก้ไข (Troubleshooting)</h3>
                <div className="space-y-4">
                  {selectedWeek.problems.map((prob, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className={`p-5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-sm'}`}>
                        <p className="text-xs text-red-600 font-black uppercase mb-1 tracking-widest">Issue</p>
                        <p className={`text-base font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{prob.issue}</p>
                      </div>
                      <div className={`p-5 rounded-xl border ${isDark ? 'bg-emerald-950/20 border-emerald-900/30' : 'bg-emerald-50 border-emerald-300'}`}>
                        <p className="text-xs text-emerald-600 font-black uppercase mb-1 tracking-widest">Solution</p>
                        <p className="text-base font-bold text-emerald-900">{prob.solution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`border rounded-xl p-6 md:p-8 ${isDark ? 'bg-slate-900/20 border-slate-800' : 'bg-slate-100 border-slate-300'}`}>
                <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2"><ImageIcon size={14} /> Work Gallery</h3>
                {selectedWeek.images && selectedWeek.images.length > 0 ? (
                  <div className={`relative group overflow-hidden rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-400 shadow-sm'} p-2`}>
                    <div className="w-full flex items-center justify-center relative min-h-[300px] md:min-h-[450px]">
                      <img src={selectedWeek.images[currentImgIdx]} alt="Work Evidence" className="max-h-[300px] md:max-h-[450px] w-auto mx-auto object-contain" />
                      <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setCurrentImgIdx((prev) => (prev - 1 + selectedWeek.images.length) % selectedWeek.images.length)} className="p-2 md:p-3 bg-black/60 text-white rounded-full hover:bg-blue-600"><ChevronLeft size={24} /></button>
                        <button onClick={() => setCurrentImgIdx((prev) => (prev + 1) % selectedWeek.images.length)} className="p-2 md:p-3 bg-black/60 text-white rounded-full hover:bg-blue-600"><ChevronRight size={24} /></button>
                      </div>
                      <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-slate-700 text-xs font-mono text-cyan-400">IMG {currentImgIdx + 1} OF {selectedWeek.images.length}</div>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video w-full rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
                    <ImageIcon size={32} className="mb-2" />
                    <p className="text-xs font-bold uppercase tracking-widest">No Work Images Available</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="animate-in slide-in-from-bottom-6 duration-700 space-y-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 border-b pb-8 border-slate-300/40">
                <div className="p-5 bg-emerald-500/10 rounded-xl text-emerald-600 border border-emerald-500/20 shadow-sm"><Building2 size={40} /></div>
                <div>
                  <h1 className={`text-3xl md:text-5xl font-black uppercase tracking-tighter ${headingClass}`}>{organizationInfo.name}</h1>
                  <p className={`font-mono text-xs md:text-sm tracking-widest mt-1 ${textMutedClass}`}>{organizationInfo.address}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 md:p-8 rounded-xl border shadow-sm ${cardBgClass}`}>
                  <h3 className="text-emerald-600 text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2"><Target size={16} /> Vision & Strategy</h3>
                  <p className={`text-xl font-black mb-2 tracking-tight ${headingClass}`}>"{organizationInfo.vision}"</p>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-800 font-bold'}`}>{organizationInfo.mission}</p>
                </div>
                <div className={`p-6 md:p-8 rounded-xl border text-sm leading-relaxed space-y-4 ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-300 shadow-sm text-slate-900 font-medium'}`}>
                  <h3 className="text-slate-500 text-xs font-black tracking-widest">About Organization</h3>
                  <p>{organizationInfo.intro}</p>
                  <div className="pt-4 border-t border-slate-300/40 space-y-2 font-mono text-xs font-bold">
                    <p className="flex items-center gap-2"><MapPin size={14} className="text-emerald-500" /> LOCATION: {organizationInfo.location}</p>
                    <p className="flex items-center gap-2"><Phone size={14} className="text-emerald-500" /> MEA CENTER: {organizationInfo.hotline} (24 HR)</p>
                  </div>
                </div>
              </div>
              <OrgChart chartData={organizationInfo.managementChart} isDark={isDark} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
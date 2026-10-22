import React, { useState } from 'react';

const COLOR_OPTIONS = [
  'bg-blue-600',
  'bg-indigo-600',
  'bg-emerald-600',
  'bg-purple-600',
  'bg-rose-600',
  'bg-amber-600',
  'bg-slate-600',
];

export default function SettingsView({ teamMembers, setTeamMembers }) {
  const [name, setName] = useState('');
  const [initials, setInitials] = useState('');
  const [color, setColor] = useState(COLOR_OPTIONS[0]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleNameChange = (val) => {
    setName(val);
    if (!editingIndex && val.trim()) {
      // Auto-generate initials from name
      const parts = val.trim().split(' ');
      const generated = parts.length > 1 
        ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
        : val.slice(0, 2).toUpperCase();
      setInitials(generated);
    }
  };

  const handleSaveMember = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingIndex !== null) {
      const updated = [...teamMembers];
      updated[editingIndex] = { name, initials: initials || name.slice(0, 2).toUpperCase(), color };
      setTeamMembers(updated);
      setEditingIndex(null);
    } else {
      setTeamMembers([...teamMembers, { name, initials: initials || name.slice(0, 2).toUpperCase(), color }]);
    }

    setName('');
    setInitials('');
    setColor(COLOR_OPTIONS[0]);
  };

  const handleEditClick = (index) => {
    const member = teamMembers[index];
    setName(member.name);
    setInitials(member.initials);
    setColor(member.color);
    setEditingIndex(index);
  };

  const handleDeleteClick = (index) => {
    if (teamMembers.length <= 1) {
      alert('You must have at least one team member.');
      return;
    }
    const updated = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updated);
    if (editingIndex === index) {
      setEditingIndex(null);
      setName('');
      setInitials('');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">Project Settings</h2>
        <p className="text-xs text-slate-400">Manage team members and assignees for VibeBoard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Member Form */}
        <div className="bg-[#141A28] border border-[#252E45] rounded-xl p-5 h-fit shadow-xl">
          <h3 className="text-sm font-bold text-white mb-4">
            {editingIndex !== null ? 'Edit Team Member' : 'Add Team Member'}
          </h3>

          <form onSubmit={handleSaveMember} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full bg-[#0B0F19] text-xs text-slate-200 p-2.5 rounded border border-[#252E45] focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Initials (2 letters)</label>
              <input
                type="text"
                maxLength="3"
                required
                value={initials}
                onChange={(e) => setInitials(e.target.value.toUpperCase())}
                placeholder="AR"
                className="w-full bg-[#0B0F19] text-xs text-slate-200 p-2.5 rounded border border-[#252E45] font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-2">Avatar Color</label>
              <div className="flex flex-wrap gap-2">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-6 h-6 rounded-full ${c} transition-transform ${
                      color === c ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs py-2 rounded transition-colors"
              >
                {editingIndex !== null ? 'Update Member' : 'Add Member'}
              </button>

              {editingIndex !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingIndex(null);
                    setName('');
                    setInitials('');
                  }}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Team Roster List */}
        <div className="md:col-span-2 bg-[#141A28] border border-[#252E45] rounded-xl p-5 shadow-xl">
          <h3 className="text-sm font-bold text-white mb-4">Team Roster ({teamMembers.length})</h3>

          <div className="space-y-3">
            {teamMembers.map((member, idx) => (
              <div
                key={member.name}
                className="flex items-center justify-between bg-[#0B0F19] border border-[#252E45] p-3 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center font-bold text-white text-xs`}>
                    {member.initials}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-100">{member.name}</p>
                    <p className="text-[10px] font-mono text-slate-500">Initials: {member.initials}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditClick(idx)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 px-2 py-1 rounded bg-indigo-950/50 border border-indigo-800/40"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(idx)}
                    className="text-xs text-rose-400 hover:text-rose-300 px-2 py-1 rounded bg-rose-950/50 border border-rose-800/40"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
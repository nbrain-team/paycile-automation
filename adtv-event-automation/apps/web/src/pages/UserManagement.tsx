import { useEffect, useState } from 'react';
import { useStore } from '@store/useStore';
import { apiUsers } from '@lib/api';

export function UserManagement() {
  const { addToast } = useStore() as any;
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  // Add/Edit form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formRole, setFormRole] = useState('bdr');
  const [formPhone, setFormPhone] = useState('');

  const loadUsers = async () => {
    try {
      const list = await apiUsers.list();
      setUsers(Array.isArray(list) ? list : []);
    } catch (err: any) {
      addToast({ title: 'Failed to load users', description: err?.message || 'Error', variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const resetForm = () => {
    setFormName('');
    setFormEmail('');
    setFormPassword('');
    setFormRole('bdr');
    setFormPhone('');
  };

  const openAdd = () => {
    resetForm();
    setEditingUser(null);
    setShowAddModal(true);
  };

  const openEdit = (user: any) => {
    setFormName(user.name || '');
    setFormEmail(user.email || '');
    setFormPassword('');
    setFormRole(user.role || 'bdr');
    setFormPhone(user.phone || '');
    setEditingUser(user);
    setShowAddModal(true);
  };

  const handleSubmit = async () => {
    if (!formName.trim() || !formEmail.trim()) {
      addToast({ title: 'Missing fields', description: 'Name and email are required', variant: 'error' });
      return;
    }

    try {
      if (editingUser) {
        const payload: any = { name: formName, email: formEmail, role: formRole, phone: formPhone };
        if (formPassword.trim()) payload.password = formPassword;
        await apiUsers.update(editingUser.id, payload);
        addToast({ title: 'User updated', description: formName, variant: 'success' });
      } else {
        if (!formPassword.trim()) {
          addToast({ title: 'Password required', description: 'Set a password for the new user', variant: 'error' });
          return;
        }
        await apiUsers.create({ name: formName, email: formEmail, password: formPassword, role: formRole, phone: formPhone });
        addToast({ title: 'User created', description: formName, variant: 'success' });
      }
      setShowAddModal(false);
      resetForm();
      setEditingUser(null);
      await loadUsers();
    } catch (err: any) {
      addToast({ title: 'Failed', description: err?.message || 'Error', variant: 'error' });
    }
  };

  const handleDelete = async (user: any) => {
    if (!window.confirm(`Delete user "${user.name}" (${user.email})? This cannot be undone.`)) return;
    try {
      await apiUsers.delete(user.id);
      addToast({ title: 'User deleted', description: user.name, variant: 'success' });
      await loadUsers();
    } catch (err: any) {
      addToast({ title: 'Failed to delete', description: err?.message || 'Error', variant: 'error' });
    }
  };

  if (loading) return <div className="text-gray-500 text-center py-12">Loading users...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-sm text-gray-600">Manage platform users and their connected accounts</p>
        </div>
        <button className="btn-primary btn-md" onClick={openAdd}>Add User</button>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-3 px-2">Name</th>
                <th className="py-3 px-2">Email</th>
                <th className="py-3 px-2">Role</th>
                <th className="py-3 px-2">Microsoft Email</th>
                <th className="py-3 px-2">LinkedIn</th>
                <th className="py-3 px-2">Created</th>
                <th className="py-3 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium">{user.name}</td>
                  <td className="py-3 px-2">{user.email}</td>
                  <td className="py-3 px-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    {user.microsoftEmail ? (
                      <span className="text-green-600 text-xs">{user.microsoftEmail}</span>
                    ) : (
                      <span className="text-gray-400 text-xs">Not connected</span>
                    )}
                  </td>
                  <td className="py-3 px-2">
                    {user.linkedinProfileUrl ? (
                      <span className="text-green-600 text-xs">Connected</span>
                    ) : (
                      <span className="text-gray-400 text-xs">Not connected</span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-xs text-gray-500">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <button className="btn-outline btn-xs" onClick={() => openEdit(user)}>Edit</button>
                      <button className="btn-outline btn-xs text-red-600" onClick={() => handleDelete(user)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No users yet. Click "Add User" to create the first user.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 border-b bg-gray-50">
              <h3 className="text-lg font-semibold">{editingUser ? 'Edit User' : 'Add New User'}</h3>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="label">Full Name *</label>
                  <input className="input" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="John Smith" />
                </div>
                <div className="col-span-2">
                  <label className="label">Email *</label>
                  <input className="input" type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder="john@paycile.com" />
                </div>
                <div className="col-span-2">
                  <label className="label">{editingUser ? 'New Password (leave blank to keep current)' : 'Password *'}</label>
                  <input className="input" type="password" value={formPassword} onChange={(e) => setFormPassword(e.target.value)} placeholder={editingUser ? 'Leave blank to keep current' : 'Set password'} />
                </div>
                <div>
                  <label className="label">Role</label>
                  <select className="input" value={formRole} onChange={(e) => setFormRole(e.target.value)}>
                    <option value="bdr">BDR</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="label">Phone</label>
                  <input className="input" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} placeholder="(555) 123-4567" />
                </div>
              </div>
              {editingUser && (
                <div className="text-xs text-gray-500 pt-2 border-t">
                  <p>Microsoft Email and LinkedIn connections are managed by the user in their own Settings page.</p>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-end gap-3">
              <button className="btn-outline btn-md" onClick={() => { setShowAddModal(false); setEditingUser(null); }}>Cancel</button>
              <button className="btn-primary btn-md" onClick={handleSubmit}>
                {editingUser ? 'Save Changes' : 'Create User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

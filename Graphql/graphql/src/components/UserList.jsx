import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import AddUserForm from './AddUserForm';
import UpdateUserModal from './UpdateUserModal';
import './UserManagement.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch users from API (replace with your actual API call)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // TODO: Replace with your actual API endpoint
        // const response = await fetch('your-api-endpoint/users');
        // const data = await response.json();
        // setUsers(data);
        // setFilteredUsers(data);
        
        // Mock data for demonstration
        const mockUsers = [
          { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
        ];
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      return;
    }
    
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = users.filter(user => 
      user.name.toLowerCase().includes(lowercasedFilter) ||
      user.email.toLowerCase().includes(lowercasedFilter) ||
      (user.phone && user.phone.includes(searchTerm))
    );
    
    setFilteredUsers(filteredData);
  };

  const handleAddUser = async (newUser) => {
    try {
      // TODO: Replace with your actual API call
      // const response = await fetch('your-api-endpoint/users', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newUser)
      // });
      // const data = await response.json();
      
      // Mock response
      const mockUser = { id: Date.now(), ...newUser };
      const updatedUsers = [...users, mockUser];
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      // TODO: Replace with your actual API call
      // const response = await fetch(`your-api-endpoint/users/${selectedUser.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updatedUser)
      // });
      // const data = await response.json();
      
      // Mock update
      const updatedUsers = users.map(user => 
        user.id === selectedUser.id ? { ...user, ...updatedUser } : user
      );
      
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setSelectedUser(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      // TODO: Replace with your actual API call
      // await fetch(`your-api-endpoint/users/${userId}`, { method: 'DELETE' });
      
      // Mock delete
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="user-management-container">
      <h1 className="user-management-title">User Management</h1>
      
      <div className="user-management-layout">
        <div>
          <SearchBar onSearch={handleSearch} />
          
          <div className="card">
            <div className="table-responsive">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div className="user-name">{user.name}</div>
                        </td>
                        <td>
                          <div className="user-email">{user.email}</div>
                        </td>
                        <td>
                          <div className="user-phone">{user.phone || 'N/A'}</div>
                        </td>
                        <td className="user-table-actions">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setIsModalOpen(true);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div>
          <AddUserForm onAddUser={handleAddUser} />
        </div>
      </div>

      <UpdateUserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onUpdate={handleUpdateUser}
      />
    </div>
  );
};

export default UserList;

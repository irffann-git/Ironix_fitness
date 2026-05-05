import { useState, useEffect } from "react";
import "./AdminDashboard.css";

const API = import.meta.env.VITE_API_URL;

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }
    fetchAllData();
  }, [token]);

  const fetchAllData = async () => {
    try {
      const headers = { "Authorization": `Bearer ${token}` };
      const [statsRes, usersRes, bookingsRes, contactsRes] = await Promise.all([
        fetch(`${API}/api/admin/stats`, { headers }).then(r => r.json()),
  fetch(`${API}/api/admin/users`, { headers }).then(r => r.json()),
  fetch(`${API}/api/admin/bookings`, { headers }).then(r => r.json()),
  fetch(`${API}/api/admin/contacts`, { headers }).then(r => r.json()),
      ]);
      if (statsRes.success) setStats(statsRes.stats);
      if (usersRes.success) setUsers(usersRes.users);
      if (bookingsRes.success) setBookings(bookingsRes.bookings);
      if (contactsRes.success) setContacts(contactsRes.contacts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id, status) => {
    try {
      await fetch(`${API}/api/admin/bookings/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      fetchAllData();
    } catch (err) { console.error(err); }
  };

  const updateContactStatus = async (id, status) => {
    try {
      await fetch(`${API}/api/admin/contacts/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      fetchAllData();
    } catch (err) { console.error(err); }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await fetch(`${API}/api/admin/users/${id}`, { 
        method: "DELETE", 
        headers: { "Authorization": `Bearer ${token}` } 
      });
      fetchAllData();
    }
  };

  const deleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      await fetch(`${API}/api/admin/bookings/${id}`, { 
        method: "DELETE", 
        headers: { "Authorization": `Bearer ${token}` } 
      });
      fetchAllData();
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    window.location.href = "/admin/login";
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h3>Ironix Admin</h3>
        <button className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
          <i className="fas fa-chart-line"></i> <span>Dashboard</span>
        </button>
        <button className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>
          <i className="fas fa-users"></i> <span>Users</span>
        </button>
        <button className={activeTab === "bookings" ? "active" : ""} onClick={() => setActiveTab("bookings")}>
          <i className="fas fa-calendar-check"></i> <span>Bookings</span>
        </button>
        <button className={activeTab === "contacts" ? "active" : ""} onClick={() => setActiveTab("contacts")}>
          <i className="fas fa-envelope"></i> <span>Enquiries</span>
        </button>
        <button onClick={logout}>
          <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
        </button>
      </div>

      <div className="content">
        {activeTab === "dashboard" && stats && (
          <>
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon"><i className="fas fa-users"></i></div>
                <div className="stat-info">
                  <h3>{stats.totalUsers}</h3>
                  <p>Total Users</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><i className="fas fa-calendar-check"></i></div>
                <div className="stat-info">
                  <h3>{stats.totalBookings}</h3>
                  <p>Total Bookings</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><i className="fas fa-rupee-sign"></i></div>
                <div className="stat-info">
                  <h3>₹{stats.totalRevenue?.toLocaleString() || 0}</h3>
                  <p>Total Revenue</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><i className="fas fa-envelope"></i></div>
                <div className="stat-info">
                  <h3>{stats.pendingContacts || 0}</h3>
                  <p>Pending Enquiries</p>
                </div>
              </div>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon"><i className="fas fa-check-circle"></i></div>
                <div className="stat-info">
                  <h3>{stats.confirmedBookings || 0}</h3>
                  <p>Confirmed</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><i className="fas fa-times-circle"></i></div>
                <div className="stat-info">
                  <h3>{stats.cancelledBookings || 0}</h3>
                  <p>Cancelled</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><i className="fas fa-check-double"></i></div>
                <div className="stat-info">
                  <h3>{stats.completedBookings || 0}</h3>
                  <p>Completed</p>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "users" && (
          <>
            <h2>All Users</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Membership</th>
                    <th>Joined Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone || "-"}</td>
                      <td>{user.membership || "None"}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button onClick={() => deleteUser(user._id)} className="delete-btn" title="Delete User">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "bookings" && (
          <>
            <h2>All Bookings</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking._id}>
                      <td>{booking.className}</td>
                      <td>{booking.userName}</td>
                      <td>{booking.date}</td>
                      <td>{booking.timeSlot}</td>
                      <td>{booking.price}</td>
                      <td>
                        <select
                          value={booking.status}
                          onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                          className={`status-select status-${booking.status}`}
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td>
                        <button onClick={() => deleteBooking(booking._id)} className="delete-btn" title="Delete Booking">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "contacts" && (
          <>
            <h2>Contact Enquiries</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map(contact => (
                    <tr key={contact._id}>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone || "-"}</td>
                      <td>{contact.message.substring(0, 60)}...</td>
                      <td>
                        <select
                          value={contact.status}
                          onChange={(e) => updateContactStatus(contact._id, e.target.value)}
                          className={`status-select status-${contact.status}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                        </select>
                      </td>
                      <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                      <td>
                        <a href={`mailto:${contact.email}`} className="reply-btn" title="Reply">
                          <i className="fas fa-reply"></i> Reply
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
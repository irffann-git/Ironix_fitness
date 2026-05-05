import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./profilePage.css";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    profileImage: "",
    membership: "",
    joinDate: "",
  });
  const [bookings, setBookings] = useState([]);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);
  const fileInputRef = useRef(null);
  const { updateUser } = useAuth();

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/signin";
        return;
      }

      try {
        const res = await axios.get("http://localhost:4000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        window.location.href = "/signin";
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Fetch user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:4000/api/bookings/my-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setBookings(res.data.bookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setBookingsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        "http://localhost:4000/api/auth/profile",
        {
          name: user.name,
          phone: user.phone,
          bio: user.bio,
          profileImage: user.profileImage,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setUser(res.data.user);
        updateUser(res.data.user);
        setEditing(false);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    
    setCancellingId(bookingId);
    const token = localStorage.getItem("token");
    
    try {
      const res = await axios.put(
        `http://localhost:4000/api/bookings/${bookingId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (res.data.success) {
        // Update the booking status in the list
        setBookings(prevBookings =>
          prevBookings.map(booking =>
            booking._id === bookingId
              ? { ...booking, status: "cancelled" }
              : booking
          )
        );
        alert("Booking cancelled successfully!");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert(error.response?.data?.message || "Failed to cancel booking");
    } finally {
      setCancellingId(null);
    }
  };

  const handleImageClick = () => {
    if (editing) fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        setUser({ ...user, profileImage: base64Image });

        const token = localStorage.getItem("token");
        try {
          const res = await axios.put(
            "http://localhost:4000/api/auth/profile",
            { profileImage: base64Image },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (res.data.success) {
            setUser(res.data.user);
            updateUser(res.data.user);
            alert("Profile picture updated!");
          }
        } catch (error) {
          console.error(error);
          alert("Failed to update profile picture");
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "confirmed": return "confirmed";
      case "cancelled": return "cancelled";
      case "completed": return "completed";
      default: return "confirmed";
    }
  };

  if (loading) {
    return <div className="profile-loading">Loading...</div>;
  }

  return (
    <div className="profile-page-wrapper">
      <div className="profile-card-container">
        <div className="profile-banner-section">
          <div className="profile-avatar-wrapper" onClick={handleImageClick}>
            <img src={user.profileImage || "https://i.pravatar.cc/150"} alt="profile" />
            {editing && (
              <div className="profile-avatar-overlay">
                <i className="fas fa-camera"></i>
              </div>
            )}
            {uploading && (
              <div className="profile-uploading">
                <i className="fas fa-spinner fa-spin"></i>
              </div>
            )}
          </div>
        </div>

        <div className="profile-info-section">
          {!editing ? (
            <>
              <h1 className="profile-user-name">{user.name}</h1>
              <p className="profile-user-email">{user.email}</p>
            </>
          ) : (
            <h1 className="profile-edit-title">Edit Profile</h1>
          )}

          <div className="profile-form-group">
            <label className="profile-form-label">
              <i className="fas fa-user" style={{ marginRight: "6px" }}></i> Name
            </label>
            <input
              className="profile-form-input"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!editing}
              placeholder="Enter your name"
            />
          </div>

          <div className="profile-form-group">
            <label className="profile-form-label">
              <i className="fas fa-phone" style={{ marginRight: "6px" }}></i> Phone
            </label>
            <input
              className="profile-form-input"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              disabled={!editing}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="profile-form-group">
            <label className="profile-form-label">
              <i className="fas fa-pen" style={{ marginRight: "6px" }}></i> Bio
            </label>
            <textarea
              className="profile-form-textarea"
              name="bio"
              value={user.bio}
              onChange={handleChange}
              disabled={!editing}
              placeholder="Tell us something about yourself..."
            />
          </div>

          {!editing && (
            <>
              <div className="profile-membership-card">
                <h3 className="profile-membership-title">
                  <i className="fas fa-trophy" style={{ marginRight: "8px" }}></i> Membership
                </h3>
                <p className="profile-membership-plan">{user.membership || "None"}</p>
                <p className="profile-membership-date">
                  <i className="fas fa-calendar-alt" style={{ marginRight: "6px" }}></i>
                  Member since {new Date(user.joinDate).toLocaleDateString()}
                </p>
              </div>

              {/* My Bookings Section */}
              <div className="profile-bookings-section">
                <h3 className="profile-bookings-title">
                  <i className="fas fa-calendar-check"></i> My Bookings
                </h3>
                
                {bookingsLoading ? (
                  <div className="no-bookings">
                    <i className="fas fa-spinner fa-spin"></i>
                    <p>Loading bookings...</p>
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="no-bookings">
                    <i className="far fa-calendar-alt"></i>
                    <p>No bookings yet</p>
                    <Link to="/classes" style={{ color: "var(--profile-secondary)" }}>Book a class</Link>
                  </div>
                ) : (
                  <div className="bookings-list">
                    {bookings.map((booking) => (
                      <div key={booking._id} className="booking-card">
                        <div className="booking-header">
                          <span className="booking-class-name">{booking.className}</span>
                          <span className={`booking-status ${getStatusBadgeClass(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="booking-details">
                          <span><i className="fas fa-calendar-day"></i> {booking.date}</span>
                          <span><i className="fas fa-clock"></i> {booking.timeSlot}</span>
                          <span><i className="fas fa-tag"></i> {booking.price}</span>
                        </div>
                        <div className="booking-trainer">
                          <i className="fas fa-chalkboard-user"></i> Trainer: {booking.trainerName}
                        </div>
                        {booking.status === "confirmed" && (
                          <div className="booking-actions">
                            <button 
                              className="cancel-booking-btn"
                              onClick={() => handleCancelBooking(booking._id)}
                              disabled={cancellingId === booking._id}
                            >
                              {cancellingId === booking._id ? (
                                <i className="fas fa-spinner fa-spin"></i>
                              ) : (
                                "Cancel Booking"
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          <div className="profile-action-buttons">
            {!editing ? (
              <button className="profile-btn profile-btn-edit" onClick={() => setEditing(true)}>
                <i className="fas fa-edit" style={{ marginRight: "8px" }}></i> Edit Profile
              </button>
            ) : (
              <>
                <button className="profile-btn profile-btn-save" onClick={handleSave}>
                  <i className="fas fa-save" style={{ marginRight: "8px" }}></i> Save Changes
                </button>
                <button className="profile-btn profile-btn-cancel" onClick={() => setEditing(false)}>
                  <i className="fas fa-times" style={{ marginRight: "8px" }}></i> Cancel
                </button>
              </>
            )}
          </div>
        </div>

        <input 
          type="file" 
          hidden 
          ref={fileInputRef} 
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
}

export default Profile;
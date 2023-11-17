import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import Axios from "axios";

export default function Profile() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { currentUser, logout } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [profileExists, setProfileExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  getUserProfileDetails();

  function getUserProfileDetails() {
    const user = {
      email: currentUser.email,
    };

    var currentUserProfileDetails = {};

    Axios.post("http://localhost:3001/read", { user })
      .then((res) => {
        currentUserProfileDetails = res.data;
        setDisplayName(currentUserProfileDetails.DisplayName);
        setUsername(currentUserProfileDetails.Username);
        setProficiency(currentUserProfileDetails.Proficiency);
        if (
          currentUserProfileDetails.DisplayName === undefined &&
          currentUserProfileDetails.Username === undefined &&
          currentUserProfileDetails.Proficiency === undefined
        ) {
          setProfileExists(false);
        } else {
          setProfileExists(true);
        }
      })
      .catch((err) => {
        if (err?.code === 'ERR_NETWORK') {
          setError("Error connecting to server!");
        }
        setError("Error connecting to server!");
        return;
      });
  }


  function deleteProfileData() {
    const user = {
      email: currentUser.email,
    };

    Axios.post("http://localhost:3001/delete", { user })
      .then((res) => {
        setLoading(true);
        setMessage("User profile details deleted successfully!");
        setLoading(false);
      })
      .catch((err) => {
        if (err?.code === 'ERR_NETWORK') {
          setError("Error connecting to server, delete failed!");
        } else {
          setError("Delete failed!");
        }
        return;
      });
      setError("");
      setMessage("");
  }

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <>
      <Card>
        <div className="border border-3 border-primary"></div>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <Card.Body>
          <h2 className="fw-bold mb-4 text-center text-uppercase">Profile</h2>
          <p className="text-center mb-4">
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p className="text-center mb-4">
            <strong>Display Name:</strong> {displayName}
          </p>
          <p className="text-center mb-4">
            <strong>Username:</strong> {username}
          </p>
          <p className="text-center mb-4">
            <strong>Proficiency:</strong> {proficiency}
          </p>
          {profileExists ? (
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              Edit Profile
            </Link>
          ) : (
            <Link to="/create-profile" className="btn btn-primary w-100 mt-3">
              Create Profile
            </Link>
          )}
          <p></p>
          <div className="d-grid">
            <Button
              disabled={loading}
              variant="danger"
              onClick={deleteProfileData}
            >
              Delete Profile Data
            </Button>
          </div>

          <div className="d-grid">
            <Link to="/dashboard" className="btn btn-info w-100 mt-3">
              Back to Dashboard
            </Link>
          </div>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
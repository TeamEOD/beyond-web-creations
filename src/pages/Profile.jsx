import React from 'react';
import NavBar from '../components/NavBar';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">User Profile</h1>
        <p className="text-center">This is where user profile information would be displayed.</p>
      </div>
    </div>
  );
};

export default Profile;
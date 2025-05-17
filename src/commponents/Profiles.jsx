import React, { useState } from 'react';

const Profile = () => {

  return (
    <>
      {/* Profile Header with Toggle Button */}
      <div className='d-flex justify-content-between align-items-center'>
        <h5 className='text-warning m-0'>Profile</h5>
        
      </div>

      {/* Collapsible Profile Form */}
      
        <div id="example-collapse-text" className='row container-fluid align-items-center justify-content-center shadow p-3 rounded'>
          
        <div className='mb-2 w-100'>
            <input type="text" placeholder='User Nam' className='form-control' />
          </div>

          {/* User Contact Input */}
          <div className='mb-2 w-100'>
            <input type="text" placeholder='User Contact' className='form-control' />
          </div>

          {/* User Email Input */}
          <div className='mb-2 w-100'>
            <input type="text" placeholder='User Email' className='form-control' />
          </div>

          {/* Update Profile Button */}
          <div className='d-grid w-100'>
            <button className='btn btn-warning'>Update Profile</button>
          </div>
        </div>
      
    </>
  );
};

export default Profile;

import React, { useRef, useState, useEffect } from 'react';
import './Manage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import lockImage from '../assets/lock2.png';

const Manage = () => {
  const [form, setForm] = useState({ site: '', username: '', password: '' });
  const [passwordArray, setPasswordArray] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const iconRef = useRef();

  // Load saved passwords on mount
  useEffect(() => {
    const passwords = localStorage.getItem('passwords');
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  // Copy to clipboard
  const copyText = (text) => {
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
    if (iconRef.current) {
      iconRef.current.setAttribute(
        'state',
        showPassword ? 'hover' : 'hover-cross'
      );
    }
  };

  // Save password entry
  const savePass = () => {
    const { site, username, password } = form;

    if (!site || !username || !password) {
      toast.error("All fields are required!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    const newEntry = { ...form, id: uuidv4() };
    const updatedArray = [...passwordArray, newEntry];
    setPasswordArray(updatedArray);
    localStorage.setItem('passwords', JSON.stringify(updatedArray));
    setForm({ site: '', username: '', password: '' });

    toast.success("Password saved!", {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
      transition: Bounce,
    });
  };

  // Delete entry by ID
  const deletePass = (id) => {
    const updatedArray = passwordArray.filter(item => item.id !== id);
    setPasswordArray(updatedArray);
    localStorage.setItem('passwords', JSON.stringify(updatedArray));

    toast.success("Password deleted!", {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
      transition: Bounce,
    });
  };

  // Edit entry by ID
  const editPass = (id) => {
    const selected = passwordArray.find(item => item.id === id);
    if (!selected) return;

    setForm({
      site: selected.site,
      username: selected.username,
      password: selected.password,
    });

    // Remove the old item so it gets replaced on save
    const updatedArray = passwordArray.filter(item => item.id !== id);
    setPasswordArray(updatedArray);
    localStorage.setItem('passwords', JSON.stringify(updatedArray));
  };

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div className='container'>
        <div className='heading'>
          <h2>PassQube</h2>
          <p>Manage Your Passwords Efficiently</p>
        </div>

        <input
          value={form.site}
          onChange={handleChange}
          placeholder='Enter website url / Name'
          name='site'
          type='text'
          required
        />

        <div className='con2'>
          <input
            value={form.username}
            onChange={handleChange}
            placeholder='Enter username'
            name='username'
            type='text'
            required
          />
          <div className='pass'>
            <input
              value={form.password}
              onChange={handleChange}
              placeholder='Enter password'
              name='password'
              type={showPassword ? 'password' : 'text'}
              required
            />
            <span onClick={togglePasswordVisibility} className='word'>
              <lord-icon
                ref={iconRef}
                src='https://cdn.lordicon.com/dicvhxpz.json'
                trigger='click'
                colors='primary:#ffffff,secondary:#eee966'
                stroke='bold'
              ></lord-icon>
            </span>
          </div>
        </div>

        <button onClick={savePass} className='btn'>
          Add Password
          <lord-icon
            src='https://cdn.lordicon.com/sbnjyzil.json'
            trigger='loop'
            colors='primary:#ffffff,secondary:#eee966'
            delay='2000'
            stroke='bold'
          ></lord-icon>
        </button>

        <div className='allpass'>
          <h2>Your Passwords</h2>
          {passwordArray.length === 0 ? (
            <div>No Passwords to Show</div>
          ) : (
            <div className='table-wrapper'>
              <table className='password-table'>
                <thead>
                  <tr>
                    <th>Website</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {passwordArray.map((item) => (
                    <tr key={item.id}>
                      <td data-label="Website">
                        <a href={item.site} target="_blank" rel="noreferrer">
                          {item.site}
                        </a>
                      </td>
                      <td data-label="Username">
                        {item.username}
                        <button className="copy" onClick={() => copyText(item.username)}>
                          copy
                        </button>
                      </td>
                      <td data-label="Password">
                        {item.password}
                        <button className="copy" onClick={() => copyText(item.password)}>
                          copy
                        </button>
                      </td>
                      <td className="action" data-label="Actions">
                        <div className="icon-row">
                          <div className="icon-label">
                            <lord-icon
                              onClick={() => deletePass(item.id)}
                              src="https://cdn.lordicon.com/oqeixref.json"
                              trigger="hover"
                              colors="primary:#a866ee"
                              style={{ width: "32px", height: "32px" }}
                            ></lord-icon>
                            <span className="icon-text">Delete</span>
                          </div>
                          <div className="icon-label">
                            <lord-icon
                              onClick={() => editPass(item.id)}
                              src="https://cdn.lordicon.com/cfkiwvcc.json"
                              trigger="hover"
                              colors="primary:#a866ee"
                              style={{ width: "32px", height: "32px" }}
                            ></lord-icon>
                            <span className="icon-text">Edit</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manage;

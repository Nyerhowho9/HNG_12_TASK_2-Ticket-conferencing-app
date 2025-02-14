import React, {useState, useEffect, useCallback} from "react";
import {useDropzone} from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
import NavBar from "../components/NavBar";
import Headng from "../components/Heading";
import ProgressBar from "../components/ProgressBar";
import cloud from '../assets/cloud.png'
import styles from '../styles/Details.module.css'
import axios from 'axios'

export default function Details() {
    const navigate = useNavigate();
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        avatar: "",
        aboutProject: ""
    });
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const savedData = localStorage.getItem("formData");
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "aboutProject") {
            const lines = value.split("\n");
            if (lines.length > 3) return; // Prevent more than 3 rows
        }
        
        setFormData({ ...formData, [name]: value });
    };

    const handleAvatarUpload = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "nyerhowho"); // Replace with Cloudinary preset

        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/${cloudName}/image/upload", formData);
            setAvatarPreview(response.data.secure_url);
            setFormData((prevData) => ({ ...prevData, avatar: response.data.secure_url }));
        } catch (error) {
            console.error("Error uploading image", error);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            handleAvatarUpload(file);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleAvatarUpload(file);
        }
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!formData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) newErrors.email = "Invalid email format";
        if (!formData.avatar) newErrors.avatar = "Avatar is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };
   
    
    return<>
        <NavBar/>
        <div  className={styles.container}>
            <Headng title="Attendee Details" steps="Step 2/3"/>
            <div  className={styles.progressContainer}>
                <div className={styles.progressBar}>
                    <div className={styles.progress}></div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                
                <div className={styles.imgContainer}>
                    <label htmlFor="avatar" className={styles.avatarLabel}>Upload Profile Photo</label>
                    <div className={styles.plainBg}>
                        <div 
                            id="avatar"
                            className={styles.dropZone} 
                            onDrop={handleDrop} 
                            onDragOver={(e) => e.preventDefault()}
                        >
                        <div className={styles.cloud}>
                                <img src={cloud}  alt="Cloud icon" />
                                <p>Drag & drop or click to upload</p> 
                                <input type="file" accept="image/*" onChange={handleFileChange}  className={styles.fileInput}/>

                        </div>
                        </div>
                    </div>
                   
            {avatarPreview && <img src={avatarPreview} alt="Profile photo Preview" className={styles.avatarPreview} />}
            {errors.avatar && <p className={styles.error}>{errors.avatar}</p>}
                </div>
                <ProgressBar/>
                <div className={styles.nameContainer}>
                    <label htmlFor="name" className={styles.nameLabel}> Enter your name:</label>
                    <br />
                    <input type="text" id="name" name="fullName" value={formData.fullName} onChange={handleChange} className={styles.name} />
                     {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}
                </div>
                <div className={styles.emailContainer}>
                    <label htmlFor="email" className={styles.emailLabel}>Email Address:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}  className={styles.email} placeholder="hello@avioflagos.io"/>
                    {errors.email && <p className={styles.error}>{errors.email}</p>}
                </div>

                <div className={styles.aboutContainer}>
                    <label htmlFor="about" className={styles.about}>About Project:</label>
                    <br />
                    <textarea
                        id="about"
                        name="aboutProject"
                        value={formData.aboutProject}
                        onChange={handleChange}
                        rows="3"
                        className={styles.textarea}
                        placeholder="Textarea"
                    />
                </div>

           
                <div className={styles.buttonContainer}>
                    <button className={styles.button1}  type="submit" > Get My Free Ticket</button>
                    <button className={styles.button2} >Back</button>
                </div>
            </form>
           
        </div>
    </>
}
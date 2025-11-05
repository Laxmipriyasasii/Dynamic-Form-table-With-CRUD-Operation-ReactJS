import React, { useState, useEffect } from "react";
import data from '../db.json';
import '../Styles/form.css';
import { useNavigate, useParams } from "react-router-dom";

export default function Form() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };
    useEffect(() => {
        if (id) {

            const storedData = JSON.parse(localStorage.getItem('AllFormData')) || [];

            const existingRecord = storedData.find(item => item.id === Number(id));
            if (existingRecord) {
                setFormData(existingRecord);
            }
        }
    }, [id]);

    function getNextId(data) {
        const usedIds = data.map(item => item.id);
        let id = 1;
        while (usedIds.includes(id)) id++;
        return id;
    }

    const validateForm = () => {
        const errors = {};
        data.forEach(field => {
            const val = formData[field.name];
            if (field.required === "true") {
                if (field.textType === "checkbox") {
                    if (!val) {
                        errors[field.name] = `${field.name} must be checked`;
                    }
                } 
                if (!val || val === "") {
                    errors[field.name] = `${field.name} is required`;
                }
                if (field.id === "email") {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(val)) {
                        errors[field.name] = "Invalid email address";
                    }
                }
                if (field.id === "c-No") {
                    const numVal=Number(val)
                    if (isNaN(val)) {
                        errors[field.name] = `${field.name} must be a number`;
                    }
                    if(numVal.toString().length<10){
                       errors[field.name] = `${field.name} must be a greater than 10 number` 
                    }

                }
            }
        });
        console.log("Validation errors:", errors);
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formentry = JSON.parse(localStorage.getItem('AllFormData')) || [];
        if (id) {

            const updatedform = formentry.map(item =>
                item.id === Number(id) ? { ...formData, id: Number(id) } : item
            );
            localStorage.setItem('AllFormData', JSON.stringify(updatedform));
        } else {

            formData.id = getNextId(formentry);
            const updatedform = [...formentry, formData];
            localStorage.setItem('AllFormData', JSON.stringify(updatedform));
        }


        setFormData({});
        setFormErrors({});
        navigate('/')
    };

    return (
        <div className="container form-container">
            <h1 className="text-center cs-label">{id ? "Update" : "Add"} Your Details</h1>
            <form onSubmit={handleSubmit} className="mt-4" noValidate>
                <div className="row">
                    {data.map((field, index) => (
                        <div
                            className={`col-12 col-sm-12 col-md-${field.textType === "textarea" || field.textType === "button" ? 12 : 6
                                }`}
                            key={index}
                        >
                            <div className="mb-3">
                                <label htmlFor={field.name} className="form-label cs-label">
                                    {field.name}
                                    {field.required === "true" && <span style={{ color: "red" }}>*</span>}
                                </label>

                                {(() => {
                                    switch (field.textType) {
                                        case "textarea":
                                            return (
                                                <>
                                                    <textarea
                                                        required={field.required === "true"}
                                                        className="form-control borderr"
                                                        value={formData[field.name] || ""}
                                                        placeholder="Leave a comment here"
                                                        id={field.id}
                                                        name={field.name}
                                                        onChange={handleChange}
                                                    />
                                                    {formErrors[field.name] && (
                                                        <div style={{ color: "red", fontSize: "0.8em" }}>
                                                            {formErrors[field.name]}
                                                        </div>
                                                    )}
                                                </>
                                            );
                                        case "select":
                                            return (
                                                <>
                                                    <select
                                                        id={field.id}
                                                        name={field.name}
                                                        className="form-select borderr"
                                                        value={formData[field.name] || ""}
                                                        onChange={handleChange}
                                                        required={field.required === "true"}
                                                    >
                                                        <option value="">--Select--</option>
                                                        {field.options.map((opt, idx) => (
                                                            <option key={idx} value={opt}>
                                                                {opt}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {formErrors[field.name] && (
                                                        <div style={{ color: "red", fontSize: "0.8em" }}>
                                                            {formErrors[field.name]}
                                                        </div>
                                                    )}
                                                </>
                                            );
                                        case "checkbox":
                                            return (
                                                <>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input borderr"
                                                            type="checkbox"
                                                            id={field.id}
                                                            name={field.name}
                                                            onChange={handleChange}
                                                            checked={!!formData[field.name]}
                                                            required={field.required === "true"}
                                                        />
                                                        <label className="form-check-label" htmlFor={field.id}>
                                                            {field.desc}
                                                        </label>
                                                    </div>
                                                    {formErrors[field.name] && (
                                                        <div style={{ color: "red", fontSize: "0.8em" }}>
                                                            {formErrors[field.name]}
                                                        </div>
                                                    )}
                                                </>
                                            );
                                        case "button":
                                            return (
                                                <div>
                                                    <button className={`btn btn-primary ${field.class}`}>
                                                        {id ? "Update" : "add"}
                                                    </button>
                                                </div>
                                            );
                                        default:
                                            return (
                                                <>
                                                    <input
                                                        type={field.type}
                                                        className="form-control borderr"
                                                        name={field.name}
                                                        id={field.id}
                                                        placeholder={field.placeholder}
                                                        required={field.required === "true"}
                                                        onChange={handleChange}
                                                        value={formData[field.name] || ""}
                                                    />
                                                    {formErrors[field.name] && (
                                                        <div style={{ color: "red", fontSize: "0.8em" }}>
                                                            {formErrors[field.name]}
                                                        </div>
                                                    )}
                                                </>
                                            );
                                    }
                                })()}
                            </div>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
}
import React from "react";
import '../Add.css';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

export const AddCourse = () => {

    const { id } = useParams();

    const [skills, setSkills] = useState([""]);

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [price, setPrice] = useState("");

    const [overviews, setOverview] = useState([""]);


    const [img, setImageURL] = useState("");

    const [level, setLevel] = useState([""]);
    
    const [module, setModule] = useState("");
    const [language, setLanguage] = useState("");
    const [v_hours, setVHours] = useState("");
    const [m_hrs, setmhrs] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [p_err, setperror] = useState("");
    const [v_err, setverror] = useState("");
    const [m_err, setmerror] = useState("");
    const [err1, seterror1] = useState("");
    const navigate = useNavigate();

    const handleSkillChange = (index, value) => {
        const updatedSkills = [...skills];
        updatedSkills[index] = value;
        setSkills(updatedSkills);
    };
    const handleOverview = (index, value) => {
        const updatedOverview = [...overviews];
        updatedOverview[index] = value;
        setOverview(updatedOverview);
    }
    const handleLevel = (index, value) => {
        const updatedLevel = [...level];
        updatedLevel[index] = value;
        setLevel(updatedLevel);
    }
    const addSkillField = () => {
        if (skills.length < 5) {
            setSkills([...skills, ""]);
        }
    };
    const addoverviewField = () => {
        if (overviews.length < 5) {
            setOverview([...overviews, ""]);
        }
    };
    const addLevelField = () => {
        if (level.length < 5) {
            setLevel([...level, ""]);
        }
    };
    const removeOverviewField = (index) => {
        const updated = [...overviews];
        updated.splice(index, 1);
        setOverview(updated);
      };
      const removeSkillField = (index) => {
        const updated = [...skills];
        updated.splice(index, 1);
        setSkills(updated);
      };
      const removeLevelField = (index) => {
        const updated = [...level];
        updated.splice(index, 1);
        setLevel(updated);
      };
    
    useEffect(() => {
        if (id) {
            axios
                .get(http://localhost:5000/courses/${id})
                .then(response => {
                    const data = response.data;
                    setSkills(data.skills || [""]);


                    setOverview(data.overviews || [""]);


                   setLevel(data.level || [""]);
                    setTitle(data.title);
                    setSummary(data.summary);
                    setPrice(data.price);
                    setImageURL(data.img);
                    setModule(data.module);
                    setLanguage(data.language);
                    setVHours(data.v_hours);
                    setmhrs(data.m_hrs);
                })

        }

    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (p_err) {
            seterror1("Please enter a valid price value");
            return;
        }
        else if (v_err) {
            seterror1("Please enter a valid video hours");
            return;
        }
        else if (m_err) {

            seterror1("Please enter a valid module hours");
            return;

        }
        else {
            seterror1("");

        }
        const newCourse = {
            img,
            skills,
            title,
            summary,
            price,
            overviews,
            level,
            module,
            language,
            v_hours,
            m_hrs
        };
        console.log(newCourse)

        if (id) {
            axios.put(http://localhost:5000/courses/${id}, newCourse)
                .then((response) => {
                    setResponseMessage("Updated successfully!");
                    navigate(/course);

                });
        }
        else {
            const randomId = (Math.floor(Math.random() * 100)).toString();
            console.log(randomId)
            newCourse.id = randomId;
            axios
                .post("http://localhost:5000/courses", newCourse)
                .then((response) => {
                    setResponseMessage("Added successfully!!");
                    navigate(/course);
                })
        }


    }
    return (
        <>
            <div className="container-fluid add_card rounded">
                <h1 className="text-center text-white">Add Course</h1>
                <form onSubmit={handleSubmit}>

                    <div className="row">
                        {skills.map((skill, index) => (
                            <div className="col-12 col-sm-4 mb-2 d-flex align-items-center" key={index}>
                                <div className="flex-grow-1">
                                    <label className="form-label login-label">Skill {index + 1}</label>
                                    <div class="input-group mb-2">
                                        <input type="text" className="form-control login-input" placeholder={Enter skill ${index + 1}} value={skill} onChange={(e) => handleSkillChange(index, e.target.value)}
                                        required={index === 0}
                                        aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                        {skills.length>1 && <div class="input-group-append">
                                                <button class="btn  border-start-0 del-overview"  onClick={() => removeSkillField(index)} type="button"><i className="bi bi-trash text-light fs-6"></i></button>
                                            </div> }
                                            
                                    </div>
                                </div>
                                {index === skills.length - 1 && skills.length < 5 && (
                                    <button
                                        type="button"
                                        className="btn btn-link ms-2 p-0 mt-4"
                                        onClick={addSkillField}
                                    >
                                        <i className="bi bi-plus-circle text-light fs-4"></i>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>



                    <div className="row">
                        <div className="col">
                            <label className="form-label login-label">Enter title</label>
                            <input type="text" className="form-control login-input" required placeholder="Enter Title" onChange={(e) => setTitle(e.target.value)} value={title} />

                        </div>
                        <div className="col">
                            <label className="form-label login-label">Enter summary</label>
                            <input type="text" className="form-control login-input" required placeholder="Enter summary" onChange={(e) => setSummary(e.target.value)} value={summary} />

                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label className="form-label login-label">Enter price</label>
                            <input type="text" className="form-control login-input" required placeholder="Enter price" onChange={(e) => {
                                const value = e.target.value;

                                if (/^\d*\.?\d*$/.test(value)) {
                                    setPrice(value);
                                    setperror("");
                                }
                                else {
                                    setPrice(value);
                                    setperror("Please enter a valid number");
                                }
                            }} value={price} />
                            {p_err && <div className="text-danger">{p_err}</div>}

                        </div>
                        <div className="col">
                            <label className="form-label login-label">Language Availble</label>
                            <input type="text" className="form-control login-input" required placeholder="Enter language" onChange={(e) => setLanguage(e.target.value)} value={language} />

                        </div>
                    </div>
                    <div className="row">
                        {overviews.map((overview, index) => (
                            <div className="col-12 col-sm-6 mb-2 d-flex align-items-center" key={index}>
                                <div className="flex-grow">
                                    <label className="form-label login-label">overview {index + 1}</label>
                                    
                                    <div class="input-group mb-2">
                                        <input type="text" className="form-control login-input" placeholder={Enter overview ${index + 1}} value={overview} onChange={(e) => handleOverview(index, e.target.value)}
                                        required={index === 0}
                                        aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                        {overviews.length>1 && <div class="input-group-append">
                                                <button class="btn  border-start-0 del-overview"  onClick={() => removeOverviewField(index)} type="button"><i className="bi bi-trash text-light fs-6"></i></button>
                                            </div> }
                                            
                                    </div>

                                </div>
                                {index === overviews.length - 1 && overviews.length < 5 && (
                                    <button
                                        type="button"
                                        className="btn btn-link ms-2 p-0 mt-4 "
                                        onClick={addoverviewField}>
                                        <i className="bi bi-plus-circle text-light fs-4"></i>
                                    </button>
                                )}
                            </div>
                        ))}

                    </div>
                    <div className="row">
                    {level.map((lev, index) => (
                            <div className="col-12 col-sm-6 mb-2 d-flex align-items-center" key={index}>
                                <div className="flex-grow">
                                    <label className="form-label login-label">Level {index + 1}</label>
                                    
                                    <div class="input-group mb-2">
                                        <input type="text" className="form-control login-input" placeholder={Enter Level ${index + 1}} value={lev} onChange={(e) => handleLevel(index, e.target.value)}
                                        required={index === 0}
                                        aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                        {level.length>1 && <div class="input-group-append">
                                                <button class="btn  border-start-0 del-overview"  onClick={() => removeLevelField(index)} type="button"><i className="bi bi-trash text-light fs-6"></i></button>
                                            </div> }
                                            
                                    </div>

                                </div>
                                {index === level.length - 1 && level.length < 5 && (
                                    <button
                                        type="button"
                                        className="btn btn-link ms-2 p-0 mt-4 "
                                        onClick={addLevelField}>
                                        <i className="bi bi-plus-circle text-light fs-4"></i>
                                    </button>
                                )}
                            </div>
                        ))}
                       
                       
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <label className="form-label login-label">Enter modules</label>
                            <input type="text" className="form-control login-input" required placeholder="Enter modules" onChange={(e) => setModule(e.target.value)} value={module} />

                        </div>
                        <div className="col-4">
                            <label className="form-label login-label">Total video hrs</label>
                            <input type="text" className="form-control login-input" required placeholder="Enter hrs" onChange={(e) => {
                                const value = e.target.value;

                                if (/^\d*\.?\d*$/.test(value)) {
                                    setVHours(value);
                                    setverror("");
                                }
                                else {
                                    setVHours(value);
                                    setverror("Please enter a valid number");
                                }
                            }} value={v_hours} />
                            {v_err && <div className="text-danger">{v_err}</div>}

                           
                        </div>
                        <div className="col-4">
                            <label className="form-label login-label">Total Module hrs</label>
                            <input type="text" className="form-control login-input" required placeholder="Enter hrs" onChange={(e) => {
                                const value = e.target.value;

                                if (/^\d*\.?\d*$/.test(value)) {
                                    setmhrs(value);
                                    setmerror("");
                                }
                                else {
                                    setmhrs(value);
                                    setmerror("Please enter a valid number");
                                }
                            }} value={m_hrs} />
                            {m_err && <div className="text-danger">{m_err}</div>}


                        </div>
                    </div>

                   
                    <div className="row py-3">
                        <div className="col">
                            <button type="submit" class="btn loginpg_btn fw-bold">{id ? "Update" : "Add"}</button>
                        </div>
                    </div>
                    {err1 && <div className="text-danger">{err1}</div>}
                </form>


            </div>
        </>
    );
}
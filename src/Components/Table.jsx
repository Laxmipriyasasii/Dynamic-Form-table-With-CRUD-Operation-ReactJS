import React, { useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import '../Styles/table.css';
import table from '../tb.json';
import { Delete, handleEdit, handleCancel, handleSave } from "./TableHandler";


function Table() {
 const navigate = useNavigate();
  const [customerData, setCustomerData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const tableHeading = ["ID", "Name", "Age", "Email", "Contact Number", "Gender", "Address", "Action"]
  const displayOrder = ["Name", "Age", "Email", "ContactNumber", "Gender", "Address"];
  

  useEffect(() => {
    const stored = localStorage.getItem("AllFormData");

    console.log(stored)
    const defaultData = [
  { id: 1, Name: "leo", Age: "45", Email: "leo@gmail.com", ContactNumber: "4567896755", Gender: "Male", Address: "NO:289,Thiru-vi-ka srt,cpt" },
  { id: 2, Name: "pri", Age: "23", Email: "l@gmail.com", ContactNumber: "8754311118", Gender: "Female", Address: "NO:289,Thiru-vi-ka srt,cpt" },
  { id: 3, Name: "priya", Age: "34", Email: "l@gmail.com", ContactNumber: "1234567890", Gender: "Female", Address: "NO:289,Thiru-vi-ka srt,cpt" },
  { id: 4, Name: "ini", Age: "2", Email: "i@gmail.com", ContactNumber: "1235678876", Gender: "Female", Address: "NO:289,Thiru-vi-ka srt,cpt" },
  { id: 5, Name: "ajay", Age: "29", Email: "ajay29@gmail.com", ContactNumber: "9876543210", Gender: "Male", Address: "NO:101, MG Road, Blr" },
  { id: 6, Name: "nisha", Age: "31", Email: "nisha31@gmail.com", ContactNumber: "8765432109", Gender: "Female", Address: "NO:102, Park Street, Kol" },
  { id: 7, Name: "arun", Age: "38", Email: "arun38@gmail.com", ContactNumber: "7654321098", Gender: "Male", Address: "NO:103, Brigade Road, Blr" },
  { id: 8, Name: "meena", Age: "27", Email: "meena27@gmail.com", ContactNumber: "6543210987", Gender: "Female", Address: "NO:104, Anna Nagar, Chennai" },
  { id: 9, Name: "rahul", Age: "42", Email: "rahul42@gmail.com", ContactNumber: "5432109876", Gender: "Male", Address: "NO:105, Indira Nagar, Blr" },
  { id: 10, Name: "kavya", Age: "22", Email: "kavya22@gmail.com", ContactNumber: "4321098765", Gender: "Female", Address: "NO:106, Koramangala, Blr" },
  { id: 11, Name: "vijay", Age: "35", Email: "vijay35@gmail.com", ContactNumber: "3210987654", Gender: "Male", Address: "NO:107, T Nagar, Chennai" },
  { id: 12, Name: "anita", Age: "28", Email: "anita28@gmail.com", ContactNumber: "2109876543", Gender: "Female", Address: "NO:108, Salt Lake, Kol" },
  { id: 13, Name: "manoj", Age: "33", Email: "manoj33@gmail.com", ContactNumber: "1098765432", Gender: "Male", Address: "NO:109, BTM Layout, Blr" },
  { id: 14, Name: "sudha", Age: "40", Email: "sudha40@gmail.com", ContactNumber: "9988776655", Gender: "Female", Address: "NO:110, Jayanagar, Blr" },
  { id: 15, Name: "raj", Age: "26", Email: "raj26@gmail.com", ContactNumber: "8877665544", Gender: "Male", Address: "NO:111, Mylapore, Chennai" },
  { id: 16, Name: "lakshmi", Age: "30", Email: "lakshmi30@gmail.com", ContactNumber: "7766554433", Gender: "Female", Address: "NO:112, Park Street, Kol" },
  { id: 17, Name: "shyam", Age: "37", Email: "shyam37@gmail.com", ContactNumber: "6655443322", Gender: "Male", Address: "NO:113, MG Road, Blr" },
  { id: 18, Name: "preethi", Age: "24", Email: "preethi24@gmail.com", ContactNumber: "5544332211", Gender: "Female", Address: "NO:114, Anna Nagar, Chennai" },
  { id: 19, Name: "kiran", Age: "39", Email: "kiran39@gmail.com", ContactNumber: "4433221100", Gender: "Male", Address: "NO:115, Brigade Road, Blr" },
  { id: 20, Name: "anjali", Age: "21", Email: "anjali21@gmail.com", ContactNumber: "3322110099", Gender: "Female", Address: "NO:116, Koramangala, Blr" },
  { id: 21, Name: "deepak", Age: "36", Email: "deepak36@gmail.com", ContactNumber: "2211009988", Gender: "Male", Address: "NO:117, Indira Nagar, Blr" },
  { id: 22, Name: "neha", Age: "25", Email: "neha25@gmail.com", ContactNumber: "1100998877", Gender: "Female", Address: "NO:118, Salt Lake, Kol" }
]
;
    //  localStorage.setItem('AllFormData', JSON.stringify(defaultData));
    setCustomerData(stored ? JSON.parse(stored) : defaultData);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);

  }, [query]);
  

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const editTable =(id)=>{
    navigate(`/form/${id}`)
  }

  const handleSave = () => {
    const updatedData = customerData.map((item) =>
      item.id === editId ? editData : item
    );
    setCustomerData(updatedData);
    localStorage.setItem("AllFormData", JSON.stringify(updatedData));
    setEditId(null);
    setEditData({});
    console.log("save")
  };

  const filteredData = customerData.filter((user) => {
    const lowerQuery = debouncedQuery.toLowerCase();


    const name = user.Name?.toLowerCase() || "";
    


    return name.includes(lowerQuery) ;
  });
  const [currentPage,setCurrentpage]= useState(1);
  const rowsperpg=5;
  const totalPg=Math.ceil(filteredData.length/rowsperpg);

  const lastIndex=currentPage*rowsperpg;
  const firstIndex=lastIndex-rowsperpg;
  
   const pertablerow=filteredData.slice(firstIndex,lastIndex);
   console.log(pertablerow)

  return (
    <> <div className="container mt-5">

      <table class="table-data table" id="myTable">
        <thead>
          <tr>
            <th colspan="5" className="text-center fs-3 table-head">
              Customer Details
            </th>
            <th colspan="2">
              <input type="text" class="search form-control float-end" id="searchInput" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name"  />
            </th>
            <th colspan="1" className="text-center">
              <Link to="form" ><span class="material-symbols-outlined icons">
                add_circle
              </span></Link>
            </th>
          </tr>

          <tr >
            {tableHeading.map((data) => (
              <th className="table-head text-center">
                <div class="wrapper">
                  <div class="tableHead">{data}</div>

                </div>
              </th>
            ))}

          </tr>
        </thead>
        <tbody>
          {pertablerow.map((data, index) =>

            <tr key={index}>
              <td className="text-center">{data.id}</td>
               
                <>
                  {
                    displayOrder.map((key) => (

                      <td className={`text-center ${key === "Name" || key === "Gender" || key === "Address" ? "text-capitalize" : ""}`}>{data[key]}</td>
                    ))
                  }

                </>
              

              <td className="text-center " style={{ width: "10%" }}>
               
                  <>
                    <button className="material-symbols-outlined icons"  onClick={()=>editTable(data.id)}>Edit</button>
                    <button className="material-symbols-outlined delete" onClick={() => Delete(data.id, setCustomerData)}>Delete</button>
                  </>
                

              </td>
              
            </tr>

          )}
        </tbody>
        <tfoot>
          <tr>
            <td className="text-center " colSpan="8"><button className="btn page-btn" onClick={()=>{if(currentPage>1) setCurrentpage(currentPage-1)}}>Prev</button>
            <button className="btn ">{currentPage}/{totalPg}</button>
            
            <button className="btn page-btn" onClick={()=>{if(currentPage<totalPg) setCurrentpage(currentPage+1)}}>Next</button></td>
            
          </tr>
        </tfoot>
      </table>


    </div>

    </>
  )
}
export default Table;

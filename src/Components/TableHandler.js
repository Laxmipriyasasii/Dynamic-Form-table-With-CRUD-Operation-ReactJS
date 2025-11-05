

export function Delete(id,setCustomerData) {
    const AllFormData = JSON.parse(localStorage.getItem('AllFormData'))
    if (window.confirm(`Are you sure you want to delete customer with ID ${id}?`)) {

        const filtered_data = AllFormData.filter(items => items.id !== id);
        localStorage.setItem('AllFormData', JSON.stringify(filtered_data));
        setCustomerData(filtered_data)
        console.log("im delete")
    }
}
// export const handleEdit =(id,setEditData,setEditId,customerData) => {
//     const row = customerData.find((item) => item.id === id);
//     setEditId(id);
//     setEditData({ ...row });
//     console.log("im edit")
//   };
export const handleCancel = (setEditData,setEditId) => {
    setEditId(null);
    setEditData({});
    console.log("im cancel")
  };
export const handleSave = (setCustomerData,setEditData,setEditId,customerData,editId,editData) => {
    const updatedData = customerData.map((item) =>
      item.id === editId ? editData : item
    );
    setCustomerData(updatedData);
    localStorage.setItem("AllFormData", JSON.stringify(updatedData));
    setEditId(null);
    setEditData({});
    console.log("im save")
  };

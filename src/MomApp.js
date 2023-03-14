import React, { useEffect, useState } from "react";
import axios from "axios";
function MomApp(props) {
  const [actionItems, setActionItems] = useState([]);
  const [newItem, setNewItem] = useState({
    id: 0,
    item: "",
    ownerName: "",
    eta: "",
    comments: "",
  });
  const [isNewRecord, setIsNewRecord] = useState(true);

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

  useEffect(() => {
    getRecords();
    // setActionItems([
    //   { id: 123, item: "ji", ownerName: "hj", eta: "jd", comments: "cj" },
    // ]);
  }, []);

  const getRecords = () => {
    if (props.isAdmin) {
      axios.get("http://localhost:3001/api/records", config).then((res) => {
        setActionItems(res.data);
      });
    } else {
      axios
        .get(`http://localhost:3001/api/records/user/${props.user}`, config)
        .then((res) => {
          setActionItems(res.data);
        });
    }
    setIsNewRecord(true);
    setNewItem({ item: "", ownerName: "", eta: "", comments: "" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/records", { ...newItem })
      .then((res) => {
        alert("Record added successfully");
        getRecords();
      });
    getRecords();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/api/records/${newItem.id}`, { ...newItem })
      .then((res) => {
        alert("Record updated successfully");
        getRecords();
      });
    getRecords();
  };

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleEdit = (index) => {
    const row = actionItems[index];
    setIsNewRecord(false);
    setNewItem({
      id: row.id,
      item: row.item,
      ownerName: row.ownerName,
      eta: row.eta,
      comments: row.comments,
    });
  };

  return (
    <div>
      <h2>Mom App - Minutes of Meeting</h2>
      {props.isAdmin && (
        <form>
          <div>
            <label>Action Item:</label>
            <input
              type="text"
              name="item"
              value={newItem.item}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Action Owner:</label>
            <input
              type="text"
              name="ownerName"
              value={newItem.ownerName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Tentative ETA:</label>
            <input
              type="datetime-local"
              name="eta"
              value={newItem.eta}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Comments:</label>
            <textarea
              name="comments"
              value={newItem.comments}
              onChange={handleChange}
            />
          </div>
          {isNewRecord ? (
            <button type="submit" onClick={handleSubmit}>
              Save
            </button>
          ) : (
            <button type="submit" onClick={handleUpdate}>
              Update
            </button>
          )}
        </form>
      )}

      <table id="customers">
        <thead>
          <tr>
            <th>Action Item</th>
            <th>Action Owner</th>
            <th>Tentative ETA</th>
            <th>Comments</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {actionItems.map((item, index) => (
            <tr key={index}>
              <td>{item.item}</td>
              <td>{item.ownerName}</td>
              <td>{item.eta}</td>
              <td>{item.comments}</td>
              <td>
                {props.isAdmin && (
                  <img
                    src="data:image/png;base64,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"
                    alt="Avatar"
                    style={{
                      height: "25px",
                      width: "25px",
                    }}
                    onClick={() => handleEdit(index)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MomApp;

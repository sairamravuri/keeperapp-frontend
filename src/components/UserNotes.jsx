import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import "./UserNotes.css";

function UserNotes() {
  const location = useLocation();
  const { user_id } = location.state;
  const [allNotes, setAllNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://keeperapp-backend.onrender.com/notes/get?user_id=${user_id}`)
      .then((res) => res.json())
      .then((data) => setAllNotes(data))
      .catch((err) => console.log(err));
  }, []);

  function handleDeleteItem() {
    fetch(`https://keeperapp-backend.onrender.com/notes/get?user_id=${user_id}`)
      .then((res) => res.json())
      .then((data) => setAllNotes(data))
      .catch((err) => console.log(err));
  }

  function addItem(newNote) {
    fetch("https://keeperapp-backend.onrender.com/notes/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, newNote }),
    })
      .then((res) => res.json())
      .then((data) =>
        setAllNotes((prevNotes) => {
          console.log(data);
          return [...prevNotes, data];
        })
      )
      .catch((err) => console.log(err));
  }

  function deleteNote(item) {
    const id = item.id;
    console.log(id);
    fetch("https://keeperapp-backend.onrender.com/notes/delete", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        handleDeleteItem();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleLogout() {
    // Clear the user state
    navigate("/");
  }

  return (
    <div className="UserNotes">
      <Header handleLogout={handleLogout} />
      <CreateArea
        onAdd={addItem}
        inputRequired={true}
        textareaRequired={true}
      />
      {allNotes.map((noteitem) => {
        return (
          <Note
            key={noteitem.id}
            id={noteitem.id}
            obj={noteitem}
            title={noteitem.title}
            content={noteitem.content}
            onDelete={deleteNote}
            inputRequired={true}
            textareaRequired={true}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default UserNotes;

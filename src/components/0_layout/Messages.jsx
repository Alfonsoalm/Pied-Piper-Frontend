import React, { useState, useEffect } from "react";
import { Global } from "../../helpers/Global.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import avatar from "../../assets/img/user.png";

export const Messages = () => {
  const { auth } = useAuth();
  const [followedUsers, setFollowedUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchFollowedUsers();
    fetchConversations();
  }, []);

  const fetchFollowedUsers = async () => {
    try {
      const response = await fetch(`${Global.url}follow/following/${auth._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (data.status === "success") {
        setFollowedUsers(data.follows);
      } else {
        console.error("Error al obtener usuarios seguidos:", data.message);
      }
    } catch (error) {
      console.error("Error fetching followed users:", error);
    }
  };

  const fetchConversations = async () => {
    try {
      const response = await fetch(`${Global.url}message/conversations`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (data.status === "success") {
        setConversations(data.data);
      } else {
        console.error("Error al obtener conversaciones:", data.message);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const response = await fetch(`${Global.url}message/conversation/${userId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("Mensajes obtenidos de ",userId)
      const data = await response.json();
      console.log("data mensaje de user ",data)
      if (data.status === "success") {
        setMessages(data.data);
        setSelectedUser(userId);
      } else {
        console.error("Error al obtener mensajes:", data.message);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch(`${Global.url}message/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          recipient: selectedUser,
          content: newMessage.trim(),
        }),
      });
      const data = await response.json();
      if (data.status === "success") {
        setMessages([...messages, data.data]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="messages-container">
      <header className="content__header">
        <h1 className="content__title">Mensajes</h1>
      </header>

      <div className="messages-layout">
        {/* Lista de conversaciones */}
        <aside className="conversations-sidebar">
          <h2>Conversaciones</h2>
          <ul>
            {conversations.map((conversation) => (
              <li
                key={conversation._id}
                className={
                  selectedUser === conversation.recipientDetails?._id ? "active" : ""
                }
                onClick={() => {
                  fetchMessages(conversation.recipientDetails?._id )}
                }
              >
                <img
                  src={
                    conversation.recipientDetails?.image
                      ? `${Global.url}user/avatar/${conversation.recipientDetails.image}`
                      : avatar
                  }
                  alt="Avatar"
                  className="conversation-avatar"
                />
                <div className="conversation-details">
                  <p className="conversation-name">
                    {conversation.recipientDetails?.name || "Usuario desconocido"}
                  </p>
                  <p className="conversation-preview">
                    {conversation.content || "Sin mensajes recientes"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Vista de mensajes */}
        <main className="messages-main">
          {selectedUser ? (
            <>
              <div className="messages-list">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={
                      message.sender === auth.id
                        ? "message-item message-sent"
                        : "message-item message-received"
                    }
                  >
                    {message.content}
                  </div>
                ))}
              </div>
              <div className="message-input-container">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                />
                <button onClick={sendMessage}>Enviar</button>
              </div>
            </>
          ) : (
            <p>Selecciona una conversación para ver los mensajes</p>
          )}
        </main>
      </div>
    </div>
  );
};

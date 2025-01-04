import React, { useState, useEffect } from "react";
import { Global } from "../../helpers/Global.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import avatar from "../../assets/img/user.png";

export const Messages = () => {
  const { auth } = useAuth();
  const [usersWithMessages, setUsersWithMessages] = useState([]); // Usuarios con conversaciones activas
  const [followedUsersWithoutMessages, setFollowedUsersWithoutMessages] = useState([]); // Usuarios seguidos sin conversación
  const [filteredItems, setFilteredItems] = useState([]); // Lista combinada para mostrar
  const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda
  const [messages, setMessages] = useState([]); // Mensajes de la conversación actual
  const [newMessage, setNewMessage] = useState(""); // Nuevo mensaje

  useEffect(() => {
    fetchConversationsAndUsers();
  }, []);

  useEffect(() => {
    filterItems(searchTerm);
  }, [searchTerm, usersWithMessages, followedUsersWithoutMessages]);

  const fetchConversationsAndUsers = async () => {
    try {
      // Obtener conversaciones activas
      const conversationsResponse = await fetch(`${Global.url}message/conversations`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      const conversationsData = await conversationsResponse.json();

      let usersWithConversations = [];
      if (conversationsData.status === "success") {
        usersWithConversations = conversationsData.data.map((conversation) => {
          const isSender = conversation.senderDetails?._id === auth._id;
          return isSender ? conversation.recipientDetails : conversation.senderDetails;
        });


        console.log("usersWithConversations",usersWithConversations);
        // Filtrar duplicados y excluir el usuario autenticado
        usersWithConversations = usersWithConversations.filter(
          (user, index, self) =>
            self.findIndex((u) => u._id === user._id) === index && user._id !== auth._id
        );
      }

      // Obtener usuarios seguidos
      const followedResponse = await fetch(`${Global.url}follow/following/${auth._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const followedData = await followedResponse.json();

      let usersFollowed = [];
      if (followedData.status === "success") {
        usersFollowed = await Promise.all(
          followedData.follows.map(async (follow) => {
            const userDetailsResponse = await fetch(`${Global.url}user/${follow.followed._id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
            });
            const userDetails = await userDetailsResponse.json();
            return userDetails.status === "success" ? userDetails.user : null;
          })
        );
      }

      // Filtrar usuarios válidos y excluir el usuario autenticado
      const validUsersFollowed = usersFollowed.filter(
        (user) => user !== null && user._id !== auth._id
      );

      // Filtrar usuarios seguidos sin mensajes
      const followedWithoutMessages = validUsersFollowed.filter(
        (user) => !usersWithConversations.find((u) => u._id === user._id)
      );

      setUsersWithMessages(usersWithConversations);
      setFollowedUsersWithoutMessages(followedWithoutMessages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const response = await fetch(`${Global.url}message/conversation/${userId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      const data = await response.json();
      console.log(`data`,data);
      if (data.status === "success") {
        setMessages(data.data);
        setSelectedUser(userId);
      }
      console.log(`${Global.url}message/conversation/${userId}`,messages);
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

  const filterItems = (term) => {
    const lowercasedTerm = term.toLowerCase();
    const filteredWithMessages = usersWithMessages.filter(
      (user) =>
        user.name.toLowerCase().includes(lowercasedTerm) ||
        user.surname.toLowerCase().includes(lowercasedTerm)
    );
    const filteredWithoutMessages = followedUsersWithoutMessages.filter(
      (user) =>
        user.name.toLowerCase().includes(lowercasedTerm) ||
        user.surname.toLowerCase().includes(lowercasedTerm)
    );

    setFilteredItems([...filteredWithMessages, ...filteredWithoutMessages]);
  };

  return (
    <div className="messages-container">
      <header className="content__header">
        <h1 className="content__title">Mensajes</h1>
        <input
          type="text"
          placeholder="Buscar por nombre o apellido..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </header>

      <div className="messages-layout">
        <aside className="conversations-sidebar">
          <h2>Conversaciones</h2>
          <ul>
            {filteredItems.map((item) => (
              <li
                key={item._id}
                className={selectedUser === item._id ? "active" : ""}
                onClick={() => fetchMessages(item._id)}
              >
                <img
                  src={item.image ? `${Global.url}user/avatar/${item.image}` : avatar}
                  alt="Avatar"
                  className="conversation-avatar"
                />
                <div className="conversation-details">
                  <p className="conversation-name">{item.name || "Usuario desconocido"}</p>
                  <p className="conversation-preview">
                    {usersWithMessages.find((u) => u._id === item._id)
                      ? "En curso"
                      : "Inicia una conversación"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        <main className="messages-main">
          {selectedUser ? (
            <>
              <div className="messages-list">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={
                      message.sender._id === auth._id
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

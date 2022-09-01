import { app } from "./";
import { getDatabase, ref, set } from "firebase/database";

export const messagesDB = getDatabase(app);

// dataWrite
export const addMessage = (connectionId, uuid, value, userId, username, chatUserId, chatUserUsername) => {
   set(ref(messagesDB, `connection/${connectionId}/connectionId`),
      connectionId
   );

   set(ref(messagesDB, `connection/${connectionId}/users`), {
      user1Id: userId,
      user2Id: chatUserId,
      user1Name: username,
      user2Name: chatUserUsername
   });

   set(ref(messagesDB, `connection/${connectionId}/messages/${uuid}`), {
      uuid,
      sender: userId,
      message: { text: value },
      createdAt: new Date().getTime(),
      time: new Date().toTimeString().substring(0,5),
   });
   
   set(ref(messagesDB, `connection/${connectionId}/recent`), {
      lastMessage: value,
      createdAt: new Date().getTime(),
      lastTime: new Date().toTimeString().substring(0,5),
   });
};

// dataRead
export const dataRead = () => {
   // onValue(ref(db, "messages/habib/"), (snapshot) => {
   //    const data = snapshot.val();
   //    if (data) {
   //       setMessages(
   //          Object.values(data).sort((a, b) => a.createdAt - b.createdAt)
   //       );
   //    }
   // });
};

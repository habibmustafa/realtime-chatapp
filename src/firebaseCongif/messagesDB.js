import { app } from "./";
import { getDatabase, ref, set } from "firebase/database";

export const messagesDB = getDatabase(app);

// !dataWrite 
export const addMessage = (
   connectionId,
   uuid,
   value,
   userId,
   username,
   chatUserId,
   chatUserUsername,
   time = new Date().toString()
) => {
   // !add connection
   set(
      ref(messagesDB, `connection/${connectionId}/connectionId`),
      connectionId
   );

   // !users
   set(ref(messagesDB, `connection/${connectionId}/users`), {
      user1Id: userId,
      user2Id: chatUserId,
      user1Name: username,
      user2Name: chatUserUsername,
   });

   // !message
   set(ref(messagesDB, `connection/${connectionId}/messages/${uuid}`), {
      uuid,
      sender: userId,
      message: { text: value },
      createdAt: new Date().getTime(),
      time: time,
   });

   // !options
   set(ref(messagesDB, `connection/${connectionId}/options`), {
      sender: userId,
      seen: false,
      counter: 1 
   });
};

// !typing - deactive
export const typing = (connectionId, userId) => {
   set(ref(messagesDB, `connection/${connectionId}/messages/typing`), {
      uuid: "typing",
      sender: userId,
      message: { text: "typing..." },
      createdAt: new Date().getTime(),
      time: new Date().toString(),
   });
};

// !dataRead
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

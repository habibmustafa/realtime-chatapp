import { app } from "./";
import { getDatabase, ref, set } from "firebase/database";

export const messagesDB = getDatabase(app);

// dataWrite
export const addMessage = (connectionId, uuid, value, userId, username, chatUserId, chatUserUsername, time=new Date().toString()) => {
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
      time: time
   });
   
   set(ref(messagesDB, `connection/${connectionId}/options`), {
      sender: userId,
      seen: false,
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

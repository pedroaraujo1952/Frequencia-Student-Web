import { database } from "../config/firebase";

export async function getUser(uid) {
  return new Promise((resolve, reject) => {
    let user = null;

    const rootRef = database.ref("salas");

    rootRef.orderByChild(uid).once("value", (snap) => {
      snap.forEach((childSnap) => {
        user = childSnap.val()[uid];

        if (user) resolve(user);
      });
    });
  });
}

export async function createUser(user) {
  const uid = user.uid;
  const classroom = user.classroom;

  const userData = {
    name: user.name,
    ra: user.ra,
    turma: user.classroom,
    checkin: "",
    checkout: "",
    keys: {
      key1: "",
      key2: "",
      key3: "",
    },
  };

  return new Promise((resolve, reject) => {
    const rootRef = database.ref(`salas`);
    rootRef
      .child(classroom)
      .child(uid)
      .set(userData)
      .then(() => resolve(uid))
      .catch((error) => {
        reject(error);
      });
  });
}

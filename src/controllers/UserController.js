import { database } from "../config/firebase";

// !DEPRECATED
export async function getUser(uid) {
  return new Promise((resolve, reject) => {
    let user = null;

    const rootRef = database.ref("students");
    // const querybaseRef = querybase.ref(rootRef, [])

    // rootRef.orderByChild(uid).once("value", (snap) => {
    //   snap.forEach((childSnap) => {
    //     user = childSnap.val()[uid];

    //     if (user) resolve(user);
    //   });
    // });
  });
}

export async function createUser(user) {
  const uid = user.uid;
  const classroom = user.classroom;

  const userData = {
    name: user.name,
    classroom,
    ra: user.ra,
  };

  return new Promise((resolve, reject) => {
    const rootRef = database.ref(`students`);
    rootRef
      .child(uid)
      .set(userData)
      .then(() => resolve(uid))
      .catch((error) => {
        reject(error);
      });
  });
}

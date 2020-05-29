import { database } from "../config/firebase";

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

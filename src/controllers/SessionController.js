import { fire } from "../config/firebase";

import * as User from "./UserController";

import Error from "../errors/user.error";

export async function signUp({ name, classroom, ra, email, pswd }) {
  return new Promise((resolve, reject) => {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, pswd)
      .then((user) => {
        const { uid } = user.user;

        const data = {
          uid,
          name,
          classroom,
          ra,
        };

        User.createUser(data).then(
          (uid) => {
            localStorage.setItem("uid", uid);
            resolve(true);
          },
          (error) => {
            fire.auth().currentUser.delete();
            const ERROR = new Error(error);
            reject(ERROR.getError);
          }
        );
      })
      .catch((error) => {
        const ERROR = new Error(error);
        reject(ERROR.getError);
      });
  });
}

export async function login(email, password) {
  return new Promise((resolve, reject) => {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        resolve(user.user.uid);
      })
      .catch((error) => {
        const ERROR = new Error(error);
        reject(ERROR.getError);
      });
  });
}

export async function reauth(token) {
  return new Promise((resolve, reject) => {
    fire
      .auth()
      .signInWithCustomToken(token)
      .then((user) => resolve(user));
  });
}

export async function forgotPassword(email) {
  const message = `Email enviado com sucesso`;
  console.log(email);

  return new Promise((resolve, reject) => {
    fire
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => resolve(message))
      .catch((error) => {
        //Error code validation
        const ERROR = new Error(error);
        reject(ERROR.getError);
      });
  });
}
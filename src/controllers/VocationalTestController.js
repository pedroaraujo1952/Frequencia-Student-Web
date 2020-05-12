import { database } from "../config/firebase";

export async function sendVocationalTestInfoToDatabase(uid, user, letter) {
    const classroom = user.turma;

    const additional_data = {
        test_done: 'ok',
        test_result: letter
    };

    return new Promise((resolve, reject) => {
        const rootRef = database.ref(`salas`);
        rootRef
        .child(classroom)
        .child(uid)
        .update(additional_data)
        .then(() => resolve(uid))
        .catch((error) => {
            reject(error);
        });
    });
}

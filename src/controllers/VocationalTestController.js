import { database } from "../config/firebase";

export async function sendVocationalTestInfoToDatabase(uid, user, answers) {
    const classroom = user.turma;

    const additional_data = {
        test_answers: answers,
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

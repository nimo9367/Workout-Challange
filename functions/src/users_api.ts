import * as functions from "firebase-functions";
import { firestore } from "firebase-admin";
const db = firestore();

export const getUsers = functions.https.onRequest(async (req, res) => {

    // Input data
    const cid = req.query.cid;

    // Query
    const result = await db
        .collection("users")
        .orderBy("totalPoints", "desc")
        .where("challenges", "array-contains", cid)
        .get()
        .then(snap => snap.docs.map(doc => doc.data()));
    res.status(200).send(result);
});

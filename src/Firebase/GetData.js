const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

// Initialize Firebase Admin SDK
// Download your service account key from:
// Firebase Console → Project Settings → Service Accounts → Generate New Private Key
const serviceAccount = require("./key.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// ─────────────────────────────────────────────
// 1. Get ALL documents from a collection
// ─────────────────────────────────────────────
async function getAllRegions() {
  const snapshot = await db.collection("districts").get();

  if (snapshot.empty) {
    console.log("No documents found.");
    return [];
  }

  const regions = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log(`Fetched ${regions.length} regions`);
  return regions;
}



module.exports = {
  getAllRegions,
//   getRegionById,
//   getRegionsByRiskLevel,
//   getRegionsByState,
//   listenToRegions,
//   uploadRegions,
};
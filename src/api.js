--- a/src/api.js
+++ b/src/api.js
@@ -52,11 +52,18 @@

export const getChallengeParticipants = (challengeId) =>
+  axios.get(`${BASE_URL}/challenges/${challengeId}/participants`).then(res => res.data);

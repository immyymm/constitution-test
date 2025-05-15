const cloud = require('wx-server-sdk');
cloud.init();
exports.main = async (event, context) => {
  const db = cloud.database();
  const { OPENID } = cloud.getWXContext();
  const { score } = event;
  const sorted = Object.entries(score).sort((a, b) => b[1] - a[1]);
  const constitution = sorted[0][0];
  await db.collection('results').add({
    data: {
      openid: OPENID,
      score,
      constitution,
      createdAt: new Date()
    }
  });
  return { success: true };
};


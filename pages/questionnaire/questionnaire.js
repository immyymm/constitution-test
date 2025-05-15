Page({
  data: {
    questions: [
      { title: "我容易感到疲倦乏力，说话无力或不想多说。", type: "qixu" },
      { title: "我手脚经常冰凉，即使天气暖也难缓解。", type: "yangxu" },
      { title: "我吃冷饮或吹空调容易腹泻或感到不适。", type: "yangxu" },
      { title: "我经常口干、喉咙干，晚上容易出汗。", type: "yinxu" },
      { title: "我容易长痘、出油，常感口苦、口干。", type: "shire" },
      { title: "我体形偏胖，常感身体沉重、胸闷有痰。", type: "phlegm" },
      { title: "我经常情绪低落、紧张或压抑，爱叹气。", type: "qiyu" },
      { title: "我面色偏暗、易淤青，有刺痛或麻木感。", type: "xueyu" },
      { title: "我容易过敏，如花粉过敏、皮疹、哮喘。", type: "tebing" },
      { title: "我常上火，易口腔溃疡，大便干结。", type: "yinxu" },
      { title: "我精力充沛、饮食睡眠正常，少生病。", type: "pinghe" },
      { title: "我经常感冒，或病后恢复慢、抵抗力差。", type: "qixu" }
    ],
    options: ["非常符合", "较符合", "一般", "不太符合", "完全不符合"]
  },
  submitForm(e) {
    const score = {}, data = e.detail.value;
    this.data.questions.forEach((q, i) => {
      const val = parseInt(data[`q${i}`]);
      score[q.type] = (score[q.type] || 0) + val;
    });
    wx.cloud.callFunction({
      name: "saveResult",
      data: { score },
      success() {
        const primary = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
        wx.navigateTo({ url: `/pages/result/result?type=${primary}` });
      }
    });
  }
})
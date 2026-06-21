const express = require('express');
const app = express();
app.use(express.json());

// 1. كود التحقق السري الذي سنضعه في موقع فيسبوك (يمكنك كتابة أي كلمة تختارها)
const VERIFY_TOKEN = "makhsoum_secret_token"; 

// رابط الـ Webhook الموحد لاستقبال التحقق والرسائل
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log("تم التحقق من السيرفر بنجاح!");
            return res.status(200).send(challenge);
        }
        return res.sendStatus(403);
    }
});

app.post('/webhook', (req, res) => {
    // هنا ستطبع المنصة الرسائل القادمة من المستخدمين في الـ Logs
    console.log("وصلت رسالة جديدة:", JSON.stringify(req.body, null, 2));
    return res.sendStatus(200);
});

// المنصة تحدد المنفذ (Port) تلقائياً عبر البيئة
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`السيرفر يعمل على منفذ ${PORT}`));
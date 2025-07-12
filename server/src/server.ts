import app from "./app";
import { connectDB } from "./config/db";
import { startCronJob } from "./cron/cronJob";

const PORT = process.env.PORT || 5000;

connectDB();
startCronJob();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import cluster from "cluster";
import os from "os";
import { app } from "./app";

const TOTAL_CPU_COUNT = os.cpus().length;

if (cluster.isMaster) {
  console.log(
    `🛠  Master is running on ${process.pid} with ${TOTAL_CPU_COUNT} workers`
  );
  for (let i = 0; i < TOTAL_CPU_COUNT; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`🔨  Worker ${worker.process.pid} died`);
    console.log("🔨  Let's fork another worker!");
    cluster.fork();
  });
} else {
  try {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Webhook Server running ✔️`);
    });
  } catch (error) {
    console.error(`Error occured: ${error.message}`);
  }
}

import app from "./app";

import cluster from "cluster";
import os from "os";

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
  const server = app.listen(process.env.PORT || 3000, () => {
    console.info(
      `Wasabi slack notfier running on Node ${process.version} & port %s ✔️ `,
      server.address()["port"]
    );
  });
}

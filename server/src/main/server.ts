import { PrismaHelper } from "../infra/db/prisma/helper/prisma-helper";
import { environment } from "./config/env";

PrismaHelper.connect().then(async () => {
  const { app } = await import("./config/app");
  setTimeout(() => {
    app
      .listen({
        port: +environment.port,
        host: "0.0.0.0",
      })
      .then((addr) => console.log(`Server is running.`, addr))
      .catch(console.error);
  }, 1000);
});

import { FastifyListenOptions } from "fastify";
import { server } from "./server"

const listenOptions: FastifyListenOptions = {
    port: parseInt(process.env.PORT || "3001", 10),
    host: "0.0.0.0",
  };
  
  server
    .listen(listenOptions) 
    .then((address) => {
      console.log(`Server running at ${address}`);
    })
    .catch((error: Error) => {
      console.error(error.message);
    });
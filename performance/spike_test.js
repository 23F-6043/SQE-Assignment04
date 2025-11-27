import http from "k6/http";
import { sleep } from "k6";

export let options = {
  stages: [
    { duration: "5s", target: 5 },    // start with small users
    { duration: "5s", target: 120 },  // sudden spike
    { duration: "10s", target: 120 }, // hold peak load
    { duration: "5s", target: 10 },   // drop back
  ],
};

export default function () {
  http.get("https://jsonplaceholder.typicode.com/users");
  sleep(0.5);
}

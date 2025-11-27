import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 15,              // constant 15 virtual users
  duration: "40s",      // longer than previous assignment
};

export default function () {
  let res = http.get("https://jsonplaceholder.typicode.com/users");

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);
}

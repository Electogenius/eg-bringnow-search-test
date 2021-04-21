import { opine } from "https://deno.land/x/opine@1.3.2/mod.ts";

const app = opine();

app.get("/", function(req, res) {
  res.send("Hello World");
});

app.listen(3000);

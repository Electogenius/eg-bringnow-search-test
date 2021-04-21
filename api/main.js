export default (req) => {
  req.respond({ body: req.url });
};

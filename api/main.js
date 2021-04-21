export default (req) => {
  req.respond({ body: req.url.split('?search=')[1] });
};

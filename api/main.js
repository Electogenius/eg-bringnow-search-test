export default (req) => {
  req.respond({ body: decodeURIComponent(req.url.split('?search=')[1]) });
};

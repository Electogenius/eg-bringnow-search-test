export default (req) => {
  var res = [];

  // GitHub
  fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.github.com/search/repositories?q=${decodeURIComponent(req.url.split('?search=')[1])}`)}&per_page=100`)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('err')
    }).then((a) => {
      var data = JSON.parse(a);
      for(var i of data.items) {
        res.push({
          type: 'github',
          title: i.full_name,
          desc: i.description||'No description available.',
          link: i.html_url,
          site: 'GitHub'
        });
      }
      req.respond({ body: res });
    });
};

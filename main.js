addEventListener("fetch", (event) => {
  var res = [];
  fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.github.com/search/repositories?q=${decodeURIComponent(req.url.split('?search=')[1])}&per_page=100`)}`)
    .then(response => {
      if (response.ok) return response.text()
      throw new Error('Network response was not ok.')
    })
    .then(data => {
      var t = JSON.parse(data).items;
      t.forEach(v => {
        res.push({
          type: 'github',
          title: t[p].full_name,
          desc: t[p].description || 'No description available.',
          link: t[p].html_url,
          site: 'GitHub'
        })
      });
    }).then(() => {
      const response = new Response(res, {
        headers: { 'content-type': 'text/plain' },
      });
      event.respondWith(response);
    })
});
var res = [];
addEventListener("fetch", (event) => {
  /* .then(() => {
       const response = new Response(res, {
         headers: { 'content-type': 'text/plain' },
       });
       event.respondWith(response);
     })*/
  event.respondWith(geth(event));
});

async function geth(s) {
  var t = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.github.com/search/repositories?q=${decodeURIComponent(new URL(s.request.url).searchParams.get('search'))}&per_page=100`)}`)
  if (t.ok) {
    var data = await t.json();
    data.items.forEach(v => {
      res.push({
        title: v.full_name,
        desc: v.description || 'No description available.',
        link: v.html_url,
        site: 'GitHub'
      })
    });
    return new Response(
     /* JSON.stringify(res),
      {
        headers: {
          "content-type": "text/plain; charset=UTF-8"
        }
      }*/
      decodeURIComponent(s.request.url));
  }
  /*
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
    })*/
}
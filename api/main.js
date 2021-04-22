export default (req) => {
  var res = [];

  fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.github.com/search/repositories?q=${decodeURIComponent(req.url.split('?search=')[1])}&per_page=100`)}`)
    .then(response => {
      if (response.ok) return response.text()
      throw new Error('Network response was not ok.')
    })
    .then(data => {
    /*  JSON.parse(data).items.forEach(i => {
        res.push({
          type: 'github',
          title: i.full_name,
          desc: i.description || 'No description available.',
          link: i.html_url,
          site: 'GitHub'
        })
      })*/
      var t = JSON.parse(data).items;
      for(var p = 0; p < JSON.parse(data).items.length; p++) {
        res.push({
          type: 'github',
          title: t[p].full_name,
          desc: t[p].description || 'No description available.',
          link: t[p].html_url,
          site: 'GitHub'
        })
      }
      req.respond({ body: res })
    });
  /*.then(data => {
    data = data.json().contents;
    /*data.items.forEach(i => {
      res.push({
        type: 'github',
        title: i.full_name,
        desc: i.description || 'No description available.',
        link: i.html_url,
        site: 'GitHub'
      })
    })
    req.respond({ body: /*resdata })
  });*/

  // GitHub
  /* fetch(`https://api.github.com/search/repositories?q=${decodeURIComponent(req.url.split('?search=')[1])}&per_page=100`)
     .then(response => {
       if (response.ok) return response.json()
       throw new Error('err')
     }).then((a) => {
       var data = a;
       data.items.forEach(i => {
         res.push({
           type: 'github',
           title: i.full_name,
           desc: i.description||'No description available.',
           link: i.html_url,
           site: 'GitHub'
         });
       });
       req.respond({ body: res });
     });
     */
};
export default (req) => {
  var res = [];

  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.github.com/search/repositories?q=${decodeURIComponent(req.url.split('?search=')[1])}&per_page=100`)}`)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Network response was not ok.')
    })
    .then(data => req.respond({ body: data.contents }));
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
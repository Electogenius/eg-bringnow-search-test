var res = [];
addEventListener("fetch", (event) => {
  event.respondWith(geth(event));
});

async function geth(s) {
  var u = new URL(s.request.url).search.substring(1); //search

  // GitHub
  /*var t = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.github.com/search/repositories?q=${u}&per_page=100`)}`)
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
  }*/

  //Gitlab
  t = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://gitlab.com/api/v4/projects?search=${u}`)}`);
  if (t.ok) {
    var data = await t.json();
    data.forEach(v => {
      res.push({
        title: v.name_with_namespace,
        desc: v.description || 'No description available.',
        link: v.web_url,
        site: 'GitLab'
      })
    });
  }
  
  res = arr.sort(() => Math.random() - 0.5);
  
  return new Response(
      JSON.stringify(res),
      {
        headers: {
          "content-type": "text/plain; charset=UTF-8"
        }
      });
}
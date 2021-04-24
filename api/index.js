const express = require('express');
const fetch = require('node-fetch');
const app = express();
var res = [];

app.get('/:se', async (req, re) => {
  const { se } = req.params;
  var t = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.github.com/search/repositories?q=${se}&per_page=100`)}`)
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
  }
  var t = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://gitlab.com/api/v4/projects?search=${se}`)}`)
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
    re.send(JSON.stringify(res))
  }
})
/*
app.listen(8080, () => {
  console.log('Running')
})
*/
module.exports = app;
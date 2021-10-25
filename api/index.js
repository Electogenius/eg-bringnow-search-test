const express = require('express');
const fetch = require('node-fetch');
const app = express();
var res = [];

app.get('/api', async (req, re) => {
  const se = req.query.search;
  var t = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.github.com/search/repositories?q=${se}&per_page=20`)}`)
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
    res.sort(function(a, b){return 0.5 - Math.random()});
    re.end(JSON.stringify(res))
  }
  var t = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.npms.io/v2/search?q=${se}`)}`)
  if(t.ok) {
    var data = await t.json();
    data.results.forEach(v => {
      res.push({
        title: v.package.name,
        desc: v.package.description || 'No description available',
        link: 'https://npmjs.com/package/' + v.package.name,
        site: 'NPM Registry'
      })
    })
  }
})

module.exports = app;
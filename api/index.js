const express = require('express');
const fetch = require('node-fetch');
const app = express();

async function gh(se) {
  var t = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.github.com/search/repositories?q=${se}&per_page=20`)}`)
  if (t.ok) {
    var data = await t.json();
    return data.items.map(v => {
      return {
        title: v.full_name,
        desc: v.description || 'No description available.',
        link: v.html_url,
        site: 'GitHub'
      }
    });
  }
}

async function gitlab(se) {
  var t = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://gitlab.com/api/v4/projects?search=${se}`)}`)
  if (t.ok) {
    var data = await t.json();
    return data.map(v => {
      return {
        title: v.name_with_namespace,
        desc: v.description || 'No description available.',
        link: v.web_url,
        site: 'GitLab'
      }
    })
  }
}

async function npm(se) {
  var t = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.npms.io/v2/search?q=${se}`)}`)
  if (t.ok) {
    var data = await t.json();
    return data.results.map(v => {
      return {
        title: v.package.name,
        desc: v.package.description || 'No description available',
        link: 'https://npmjs.com/package/' + v.package.name,
        site: 'NPM Registry'
      }
    })
  }
}

app.get('/api', (req, re) => {
  const se = req.query.search;

  Promise.all([
    gh(se),
    gitlab(se),
    npm(se)
  ]).then(v => {
    const res = v.flat().sort(() => 0.5 - Math.random());

    re.end(JSON.stringify(res));
  })
})

app.listen(3000)

module.exports = app;
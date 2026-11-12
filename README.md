==================== FILE: README.md ====================
# Phetho Tsoeu - Portfolio
 
Static site (no build step). Upload everything to  `bigdugg23.github.io` repository.
 
- Put your hero photo at `IMG_8551.jpeg` in the root (same as before).
- Repos: all public repos load live from GitHub (new ones appear automatically); `data/repos.json` is a daily fallback snapshot.
- `js/config.js` - name, contact details, GitHub username, `credlyUsername`, `showMarks`.
- `data/academics.json` - paste in your newest academic record results here.
- `data/certificates.json` - add certificates by hand.
- Cisco badges: set `credlyUsername` in `js/config.js`; the GitHub Action in `.github/workflows` syncs
  them daily into `data/credly-badges.json`. (Make your Credly profile public.)

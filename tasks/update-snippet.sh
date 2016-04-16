snippeturl="https://raw.githubusercontent.com/rollbar/rollbar.js/master/dist/rollbar.snippet.js"
packageurl="https://raw.githubusercontent.com/rollbar/rollbar.js/master/package.json"

echo "/*jshint ignore:start*/" > addon/snippet.js
curl --silent $snippeturl >> addon/snippet.js
echo "/*jshint ignore:end*/" >> addon/snippet.js
if $(git diff-index --quiet --cached HEAD); then
  echo "Committing changes ..."
  version=$(curl --silent $packageurl | grep 'version": "' | head -n 1 | cut -d '"' -f 4)
  git add addon/snippet.js
  git commit -m "update rollbar snippet to version $version"
  echo "Publishing changes ..."
  npm version patch -m "update rollbar snippet to version $version"
  git push origin master
  git push origin --tags
  npm publish
else
  echo "Git index is dirty, skipping git commit and npm publish steps"
fi

echo "Snippet updated!"

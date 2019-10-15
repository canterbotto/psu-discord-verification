@echo off
set /p name = "Enter a commit name: "
git add config.json
git add package.json
git add package-lock.json
git add README.md
git add main.js
git add Log.js
git add DB.js
git add commands\accept.js
git add commands\register.js
git add commands\verify.js
git commit -m %name%
git push main master
pause
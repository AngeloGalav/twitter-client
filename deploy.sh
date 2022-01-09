cd backend
rm -rf build
mv ../build .
rsync -av --exclude 'node_modules' . angelo.galavotti@annina.cs.unibo.it:/home/web/site202148/html/

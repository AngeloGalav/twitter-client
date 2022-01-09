mv build backend/
cd backend
rsync -av --exclude 'node_modules' angelo.galavotti@annina.cs.unibo.it:/home/web/site202148/html/ .
ssh angelo.galavotti@annina.cs.unibo.it 'cd /home/web/site202148/html/ && npm install && npm install twitter'
ssh angelo.galavotti@annina.cs.unibo.it 'ssh gocker.cs.unibo.it "" '


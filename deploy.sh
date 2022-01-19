npm run build
cd backend
if [ -d "../build" ]; then
    echo "Moving files from frontend build directory..."
    rm -rf build
    mv ../build .
else
    echo "frontend build directory not found..."
fi
rsync -av -o --exclude 'node_modules' . angelo.galavotti@annina.cs.unibo.it:/home/web/site202148/html/

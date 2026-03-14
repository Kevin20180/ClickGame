cd client
tsc -w &

while inotifywait -r scripts -e "modify,attrib,move,create,delete,delete_self"; do
    sleep 0.5
    
    echo "Empacotando..."
    
    esbuild scripts/main.ts \
        --bundle \
        --outfile=public/scripts/main.js \
        --format=iife \
        --sourcemap="inline"
    
    echo "Empacotado."
done
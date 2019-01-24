TEST=npm test

test:
	npm test

build: clean
	npx babel kernel.js editor.js sd2.js dashboard.js --out-file sd.js --presets=es2015

clean:
    rm sd.js

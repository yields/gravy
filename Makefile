
BROWSERS= 'ie9...11, safari, chrome, firefox'
URL= http://localhost:3000/test

build: components lib/client.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

test/pid:
	@node_modules/.bin/serve -L . 2>&1 & \
	echo $$! > test/pid
	@sleep 1

server: test/pid

node_modules: package.json
	@npm install

test-server: node_modules
	@node_modules/.bin/mocha \
		--reporter dot \
		--require should

test: build server
	@open $(URL)

test-sauce: build server
	@BROWSERS=$(BROWSERS) node bin/gravy --url $(URL)

.PHONY: clean test-server
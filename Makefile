
C8= node_modules/.bin/component
URL= http://localhost:3000/test

build: node_modules components lib/client.js
	@$(C8) build --dev

components: component.json
	@$(C8) install --dev

clean:
	rm -fr build components template.js node_modules
	@$(MAKE) kill

test/pid:
	@node_modules/.bin/serve -L . &> /dev/null & \
	echo $$! > test/pid
	@sleep 1

server: test/pid

node_modules: package.json
	@npm install

test: node_modules
	@node_modules/.bin/mocha test/gravy \
		--reporter dot \
		--require should

test-browser: build server
	@open $(URL)

test-sauce: build server
	@BROWSERS=$(BROWSERS) node bin/gravy --url $(URL)

kill:
	@-kill `cat test/pid`
	@rm -f test/pid

.PHONY: clean test-server test-browser test-sauce test kill

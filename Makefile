SHELL:=/bin/bash

day-%:
	mkdir day_$*
	pushd day_$* && touch index.js && touch index.test.js && touch test.txt && touch input.txt && yarn init -y && popd
SHELL:=/bin/bash

2023/day-%:
	mkdir 2023/day_$*
	pushd 2023/day_$* && \
	touch index.js && \
	touch index.test.js && \
	touch test.txt && \
	aoc d && \
	popd
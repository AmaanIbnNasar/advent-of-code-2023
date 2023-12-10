SHELL:=/bin/bash
mkfile_path := $(abspath $(lastword $(MAKEFILE_LIST)))
current_dir :=  $(patsubst %/,%,$(dir $(mkfile_path)))



2023/day-%:
	mkdir 2023/day_$*
	pushd 2023/day_$* && \
	touch index.js && \
	echo 'import { fileURLToPath } from "url";export const main = () => {};if (process.argv[1] == fileURLToPath(import.meta.url)) {main();}' > index.js && \
	touch index.test.js && \
	touch test.txt && \
	aoc d && \
	mv input input.txt && \
	popd

run-2023/day-%:
	node $(current_dir)/2023/day_$*/index.js

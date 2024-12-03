SHELL:=/bin/bash
mkfile_path := $(abspath $(lastword $(MAKEFILE_LIST)))
current_dir :=  $(patsubst %/,%,$(dir $(mkfile_path)))

check_year:
ifdef year
	@echo "Year is defined $(year)"
endif
ifndef year
	$(error Year is not defined)
endif

new_day_%: check_year
	mkdir ${year}/day_$*
	pushd ${year}/day_$* && \
	touch index.js && \
	echo 'import { fileURLToPath } from "url";export const main = () => {};if (process.argv[1] == fileURLToPath(import.meta.url)) {main();}' > index.js && \
	touch index.test.js && \
	touch test.txt && \
	aoc -d $* d && \
	mv input input.txt && \
	popd

run-day_%: check_year
	node $(current_dir)/${year}/day_$*/index.js

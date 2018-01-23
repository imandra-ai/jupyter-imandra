 
OCAMLBUILD=ocamlbuild -use-ocamlfind

all: build

build:
	$(OCAMLBUILD) src/jymandra.byte

BIN?=/usr/bin/

install: build
	@echo "install binary into $(BIN)"
	cp jymandra.byte $(BIN)/jymandra

uninstall:
	rm $(BIN)/jymandra

clean:
	$(OCAMLBUILD) -clean

install-kernel:
	jupyter kernelspec install `pwd`/jupyter_imandra/ --user

reindent:
	@which ocp-indent || ( echo "require ocp-indent" ; exit 1 )
	@find src/ '(' -name '*.ml' -or -name '*.mli' ')' -type f -print0 | xargs -0 echo "reindenting: "
	@find src/ '(' -name '*.ml' -or -name '*.mli' ')' -type f -print0 | xargs -0 ocp-indent -i

watch:
	while find src -name '*.ml*' -print0 | xargs -0 inotifywait -e delete_self -e modify ; do \
		echo "============ at `date` ==========" ; \
		make all; \
	done

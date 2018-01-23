 
OCAMLBUILD=ocamlbuild -use-ocamlfind

all: build

build:
	$(OCAMLBUILD) jymandra.byte

clean:
	$(OCAMLBUILD) -clean

install-kernel:
	jupyter kernelspec install `pwd` --user

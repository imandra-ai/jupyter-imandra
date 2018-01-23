 
OCAMLBUILD=ocamlbuild -use-ocamlfind

all: build

build:
	$(OCAMLBUILD) jucaml.byte

clean:
	$(OCAMLBUILD) -clean

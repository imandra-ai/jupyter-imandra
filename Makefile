
all: build

build:
	@dune build @install

BIN?=/usr/bin/

clean:
	@dune clean

install-kernel:
	jupyter kernelspec install `pwd`/share/kernelspec/imandra --user
	jupyter kernelspec install `pwd`/share/kernelspec/imandra-narya --user
	jupyter kernelspec install `pwd`/share/kernelspec/imandra-reason --user

install-nbimandra:
	pip install --user -r requirements.txt
	jupyter nbextensions_configurator enable
	jupyter-kernelspec install share/kernelspec/imandra --user
	jupyter-kernelspec install share/kernelspec/imandra-reason --user
	
	pip install --user share/nbextensions/nbimandra
	jupyter nbextension install --py nbimandra --user
	jupyter nbextension enable --py nbimandra


reindent:
	@which ocp-indent || ( echo "require ocp-indent" ; exit 1 )
	@find src/ '(' -name '*.ml' -or -name '*.mli' ')' -type f -print0 | xargs -0 echo "reindenting: "
	@find src/ '(' -name '*.ml' -or -name '*.mli' ')' -type f -print0 | xargs -0 ocp-indent -i

watch:
	@dune build @install -w

watch-share:
	chokidar "share/nbextensions/nbimandra/**/*" -c "source venv/bin/activate && pip install share/nbextensions/nbimandra && jupyter nbextension install --py --sys-prefix nbimandra && jupyter nbextension enable --py --sys-prefix nbimandra"

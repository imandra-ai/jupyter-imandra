
all: build

build:
	jbuilder build @install

BIN?=/usr/bin/

clean:
	jbuilder clean

install-kernel:
	jupyter kernelspec install `pwd`/share/kernelspec/imandra --user

install-nbimandra:
	pip install --user -r requirements.txt
	jupyter nbextensions_configurator enable
	jupyter-kernelspec install share/kernelspec/imandra --user
	
	pip install --user share/nbextensions/nbimandra
	jupyter nbextension install --py nbimandra --user
	jupyter nbextension enable --py nbimandra


reindent:
	@which ocp-indent || ( echo "require ocp-indent" ; exit 1 )
	@find src/ '(' -name '*.ml' -or -name '*.mli' ')' -type f -print0 | xargs -0 echo "reindenting: "
	@find src/ '(' -name '*.ml' -or -name '*.mli' ')' -type f -print0 | xargs -0 ocp-indent -i

watch:
	while find src -name '*.ml*' -print0 | xargs -0 inotifywait -e delete_self -e modify ; do \
		echo "============ at `date` ==========" ; \
		make all; \
	done

watch-share:
	chokidar "share/nbextensions/nbimandra/**/*" -c "pip install share/nbextensions/nbimandra && jupyter nbextension install --py --sys-prefix nbimandra && jupyter nbextension enable --py --sys-prefix nbimandra"


all: build

build:
	jbuilder build @install

BIN?=/usr/bin/

clean:
	jbuilder clean

install-kernel:
	jupyter kernelspec install `pwd`/jupyter-imandra/ --user

reindent:
	@which ocp-indent || ( echo "require ocp-indent" ; exit 1 )
	@find src/ '(' -name '*.ml' -or -name '*.mli' ')' -type f -print0 | xargs -0 echo "reindenting: "
	@find src/ '(' -name '*.ml' -or -name '*.mli' ')' -type f -print0 | xargs -0 ocp-indent -i

watch:
	while find src -name '*.ml*' -print0 | xargs -0 inotifywait -e delete_self -e modify ; do \
		echo "============ at `date` ==========" ; \
		make all; \
	done

jupyterhub-docker-build:
	docker build -f imandra/Dockerfile.ubuntu -t imandra-build --target build imandra
	docker build -f jupyterhub/Dockerfile.singleuser -t jupyterhub-imandra .
	docker build -f jupyterhub/Dockerfile.landing-page -t jupyterhub-landing-page jupyterhub

jupyterhub-docker-push:
	docker tag jupyterhub-imandra eu.gcr.io/vocal-territory-126312/jupyter-imandra:$(tag)
	docker tag jupyterhub-landing-page eu.gcr.io/vocal-territory-126312/jupyter-landing-page:$(tag)
	docker push eu.gcr.io/vocal-territory-126312/jupyter-imandra:$(tag)
	docker push eu.gcr.io/vocal-territory-126312/jupyter-landing-page:$(tag)

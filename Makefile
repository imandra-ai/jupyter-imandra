
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
	docker build -f jupyterhub/Dockerfile.singleuser -t eu.gcr.io/vocal-territory-126312/jupyterhub-imandra:$(tag) .
	docker build -f jupyterhub/Dockerfile.k8s-hub -t eu.gcr.io/vocal-territory-126312/jupyterhub-k8s-hub:$(tag) jupyterhub

jupyterhub-docker-push:
	docker push eu.gcr.io/vocal-territory-126312/jupyterhub-imandra:$(tag)
	docker push eu.gcr.io/vocal-territory-126312/jupyterhub-k8s-hub:$(tag)

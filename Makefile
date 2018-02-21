
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
	echo Checking for TAG
	test $(TAG)
	docker build -f imandra/Dockerfile.ubuntu -t imandra-build --target build imandra
	docker build -f imandra/Dockerfile.ubuntu -t imandra-base --target base imandra
	docker build -f jupyterhub/Dockerfile.singleuser -t eu.gcr.io/vocal-territory-126312/jupyterhub-imandra:$(TAG) .
	docker build -f jupyterhub/Dockerfile.k8s-hub -t eu.gcr.io/vocal-territory-126312/jupyterhub-k8s-hub:$(TAG) jupyterhub
	docker build -f jupyterhub/Dockerfile.landing-page -t eu.gcr.io/vocal-territory-126312/jupyterhub-landing-page:$(TAG) jupyterhub

jupyterhub-docker-push:
	echo Checking for TAG
	test $(TAG)
	docker push eu.gcr.io/vocal-territory-126312/jupyterhub-imandra:$(TAG)
	docker push eu.gcr.io/vocal-territory-126312/jupyterhub-k8s-hub:$(TAG)
	docker push eu.gcr.io/vocal-territory-126312/jupyterhub-landing-page:$(TAG)

jupyterhub-deploy:
	echo Checking for TAG
	test $(TAG)
	kubectl patch deployment landing-page -p '{"spec": {"template": {"spec": {"containers": [{"name": "nginx", "image": "eu.gcr.io/vocal-territory-126312/jupyterhub-landing-page:$(TAG)"}]}}}}'
	kubectl patch deployment hub -p '{"spec": {"template": {"spec": {"containers": [{"name": "hub-container", "image": "eu.gcr.io/vocal-territory-126312/jupyterhub-k8s-hub:$(TAG)", "env": [{"name": "SINGLEUSER_IMAGE", "value": "eu.gcr.io/vocal-territory-126312/jupyterhub-imandra:$(TAG)"}]}]}}}}'
	sleep 5
	kubectl patch $(shell kubectl get ds -o name) -p '{"spec": {"template": {"spec": {"initContainers": [{"name": "image-pull-singleuser", "image": "eu.gcr.io/vocal-territory-126312/jupyterhub-imandra:$(TAG)"}]}}}}'

# Deploying jupyterhub with helm

From following through the steps on [https://zero-to-jupyterhub.readthedocs.io/en/latest/][here]

## On scratchpad:

Steps ran:

### Choose project
```shell
gcloud config set core/project vocal-territory-126312
```

### Cluster creation

```shell
gcloud container clusters create jupyterhub-imandra-cluster --num-nodes=1 --machine-type=n1-standard-2 --zone=europe-west2-a --cluster-version=1.8.6-gke.0
kubectl create clusterrolebinding cluster-admin-binding --clusterrole=cluster-admin --user=dave@aestheticintegration.com
```

### Pushing singleuser image
```shell
gcloud docker --authorize-only
docker tag jupyter-imandra eu.gcr.io/vocal-territory-126312/jupyter-imandra:201730011131
```

*MAKE SURE THE jupyterhub/config.yaml image name matches the one you've pushed.*
*Watch out if the tag is just a number to quote it (YAML parses it as a number otherwise!)**

### Install and setup helm
```shell
curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get | bash
kubectl --namespace kube-system create serviceaccount tiller
kubectl create clusterrolebinding tiller --clusterrole cluster-admin --serviceaccount=kube-system:tiller
helm init --service-account tiller
kubectl --namespace=kube-system patch deployment tiller-deploy --type=json --patch='[{"op": "add", "path": "/spec/template/spec/containers/0/command", "value": ["/tiller", "--listen=localhost:44134"]}]'
helm repo add jupyterhub https://jupyterhub.github.io/helm-chart/
helm repo update

```
### Install jupyterhub on the cluster

#### Generating a new secret token (for config.yml)

This should not be committed to git - solution for storing this still pending. 
https://github.com/kubernetes/helm/issues/2196

The current value is a temporary one for scratchpad cluster and will be changed for production.

```shell
openssl rand -hex 32
```

```shell
helm install jupyterhub/jupyterhub \
    --version=v0.5 \
    --name=jupyterhub-imandra \
    -f jupyterhub/config.yaml
```

### To update after a `config.yaml` change:

```shell
helm upgrade jupyterhub-imandra jupyterhub/jupyterhub --version=v0.5 -f jupyterhub/config.yaml
```


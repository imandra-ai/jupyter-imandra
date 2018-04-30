# jupyter imandra
A very simple Jupyter kernel for Imandra

## Compilation

You'll need `Yojson`, `Nocrypto`, `uuidm`, and `ZMQ` bindings for OCaml,
as well as the `imandra` library and Z3.

    $ make

## Installation 
Check in which directories your Jupyter looks for kernels.

    $ make install install-kernel 

Start a web notebook with:

    $ jupyter notebook


## Examples

- [decompose1](example_notebooks/decompose1.ipynb)

## Using the notebook in a virtualenv

    virtualenv venv -p python3
    pip install -r requirements.txt
    jupyter nbextensions_configurator enable --sys-prefix
    jupyter-kernelspec install share/kernelspec/imandra

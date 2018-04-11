# jupyter imandra
A very simple Jupyter kernel for Imandra

## Compilation

You'll need `Yojson`, `Nocrypto`, `uuidm`, and `ZMQ` bindings for OCaml,
as well as the `imandra` library and Z3.

    $ make

## Installation 
Check in which directories your Jupyter looks for kernels.

    $ make install install-kernel 

Install the nbimandra jupyter nbextension for dynamic notebook elements. You may or may not want to use `--sys-prefix` in the `nbextension` step depending on your python setup.

    $ pip install `pwd`/nbextensions/nbimandra
    $ jupyter nbextension install --py [--sys-prefix] nbimandra
    $ jupyter serverextension enable --py [--sys-prefix] nbimandra
    $ jupyter nbextension enable --py [--sys-prefix] nbimandra

Start a web notebook with:

    $ jupyter notebook


## Examples

- [decompose1](example_notebooks/decompose1.ipynb)

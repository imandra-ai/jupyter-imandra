FROM imandra-build as kernel-build
RUN opam pin add imandra . --no-action

RUN sudo apt-get update && sudo apt-get install -y git libzmq3-dev
RUN cd /home/opam/opam-repository && git pull
RUN opam config exec -- opam update && opam upgrade

WORKDIR /build/jupyter-imandra
RUN sudo chown opam: /build/jupyter-imandra
ADD Makefile \
    src \
    jupyter-imandra \
    jupyter-imandra.opam \
    ./

RUN opam config exec -- opam pin add jupyter-imandra . --no-action
RUN opam config exec -- opam install jupyter-imandra

FROM jupyter/minimal-notebook

USER root
RUN apt-get update && apt-get install -y git libzmq3-dev

USER jovyan
COPY --from=kernel-build /home/opam/.opam/4.03.0/  /home/opam/.opam/4.03.0/

ENV LD_LIBRARY_PATH=/home/opam/.opam/4.03.0/lib/stublibs/:/home/opam/.opam/4.03.0/lib/z3/:$LD_LIBRARY_PATH
ENV CAML_LD_LIBRARY_PATH=/home/opam/.opam/4.03.0/lib/stublibs/:/home/opam/.opam/4.03.0/lib/z3/
ENV PATH=/home/opam/.opam/4.03.0/bin:$PATH

ADD jupyter-imandra /usr/local/share/jupyter/kernels/imandra/
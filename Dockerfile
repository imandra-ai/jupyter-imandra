FROM imandra-build as kernel-build
RUN opam pin add imandra . --no-action

RUN sudo apk update && sudo apk add git zeromq-dev
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
RUN opam config exec -- opam install jupyter-imandra --deps-only
RUN opam config exec -- make build

FROM jupyter/minimal-notebook
COPY --from=kernel-build /build/jupyter-imandra/_build/install/default/bin/jymandra /usr/bin/jymandra
COPY --from=kernel-build /home/opam/.opam/4.03.0/lib/imandra  /home/opam/.opam/4.03.0/lib/imandra
ENV LD_LIBRARY_PATH=/home/opam/.opam/4.03.0/lib/stublibs/:/home/opam/.opam/4.03.0/lib/z3/
ENV CAML_LD_LIBRARY_PATH=/home/opam/.opam/4.03.0/lib/stublibs/:/home/opam/.opam/4.03.0/lib/z3/

ADD jupyter-imandra /jupyter/imandra/
RUN jupyter kernelspec install /jupyter/imandra/ --user
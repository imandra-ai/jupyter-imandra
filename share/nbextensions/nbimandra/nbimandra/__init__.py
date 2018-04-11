def _jupyter_server_extension_paths():
    return [{
        "module": "nbimandra"
    }]

# Jupyter Extension points
def _jupyter_nbextension_paths():
    return [dict(
        section="notebook",
        src="static",
        dest="nbimandra",
        # _also_ in the `nbextension/` namespace
        require="nbimandra/main")]

def load_jupyter_server_extension(nbapp):
    nbapp.log.info("nbimandra loaded.")

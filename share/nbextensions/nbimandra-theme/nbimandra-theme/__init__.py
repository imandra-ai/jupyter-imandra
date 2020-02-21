import pathlib

def _jupyter_nbextension_paths():
    return [
        {
            # Load this on all the pages!
            "section": "common",
            "dest": "nbimandra-theme",
            "src": "static",
            "require": "nbimandra-theme/main"
        }
    ]

def _jupyter_server_extension_paths():
    return [{
        "module": "nbimandra-theme"
    }]

def load_jupyter_server_extension(nbapp):
    # Add our custom templates to the beginning of the search path.
    templates_dir = pathlib.Path(__file__).parent.absolute().joinpath("templates").as_posix()
    # NbApp settings have already been propogated so we need to modify the webapp settings directly
    # nbapp.extra_template_paths.append(templates_dir)
    nbapp.web_app.settings["jinja2_env"].loader.searchpath.insert(0, templates_dir)
    nbapp.log.info("Imandra theme enabled!")

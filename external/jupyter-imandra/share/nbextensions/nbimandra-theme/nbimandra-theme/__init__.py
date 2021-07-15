import os
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

    env = nbapp.web_app.settings["jinja2_env"]

    if nbapp.__class__.__name__ == 'SingleUserNotebookApp':
        # Running in jupyterhub.

        # jupyterhub-singleuser already extends 'templates/page.html'. Since we
        # want to extend it as well, we have to do something funky here.

        # We are patching this logic:
        # https://github.com/jupyterhub/jupyterhub/blob/9391470e269cf2cbc39520f903ab42900aa991ca/jupyterhub/singleuser.py#L483-L492
        # So that
        # our page.html --extends-> singleuser.page_template --extends-> templates/page.html

        from jupyterhub import singleuser
        import jinja2

        def get_page(name):
            if name == 'singleuser.page_template':
                return singleuser.page_template

        env.loader = jinja2.ChoiceLoader([
            jinja2.FileSystemLoader(os.path.join(templates_dir, 'jupyterhub-singleuser')),
            jinja2.FileSystemLoader(templates_dir),
            jinja2.FunctionLoader(get_page),
            env.loader
        ])

        pass
    else:
        env.loader.searchpath.insert(0, templates_dir)

    nbapp.log.info("Imandra theme enabled!")

def _jupyter_nbextension_paths():
    return [
        {
            # Load this on all the pages!
            "section": "notebook",
            "dest": "nbimandra",
            "src": "static",
            "require": "nbimandra/main"
        }
    ]

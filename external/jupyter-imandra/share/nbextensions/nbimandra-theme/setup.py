import setuptools

setuptools.setup(
    name="nbimandra-theme",
    version='0.1.0',
    url="https://github.com/aestheticintegration/jupyter-kernel",
    author="Matt Bray",
    description="Jupyter extension to add the imandra theme to the notebook",
    packages=setuptools.find_packages(),
    install_requires=[
        'notebook',
    ],
    package_data={'nbimandra-theme': ['static/*', 'static/images/*', 'templates/*', 'templates/jupyterhub-singleuser/*']},
)

import setuptools

setuptools.setup(
    name="nbimandra",
    version='0.1.0',
    url="https://github.com/aestheticintegration/jupyter-kernel",
    author="Dave Aitken",
    description="Jupyter extension to add imandra-specific extensions (JS deps) to the notebook",
    packages=setuptools.find_packages(),
    install_requires=[
        'notebook',
    ],
    package_data={'nbimandra': ['static/*', 'static/**/*', 'static/**/**/*']},
)

import setuptools

setuptools.setup(
    name="nbimandra",
    version='0.1.0',
    url="https://github.com/aestheticintegration/jupyter-imandra",
    author="Dave Aitken / AI",
    description="Imandra kernel frontend extensions",
    packages=setuptools.find_packages(),
    install_requires=[
        'notebook',
    ],
    package_data={'nbimandra': ['static/*']},
)

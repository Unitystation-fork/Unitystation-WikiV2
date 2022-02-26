# unitystation-wiki

This is the github project for the [Unitystation wiki](https://unitystation.github.io/unitystation-wiki/#).

## Contribution

The easiest way to make a change is to click the pencil in the top right of a page in github, or, if you're looking at a page on [unitystation.github.io/unitystation-wiki/](https://unitystation.github.io/unitystation-wiki/#), click the *Edit on unitystation/unitystation-wiki* link at the bottom of the page. Make your change, then send a PR (pull request). It will be reviewed and, if approved, added to the wiki. You will need to have a github account for this.

All contributions to the unitystation wiki must follow the Unitystation wiki guidelines in order to be accepted to the wiki. Read them here: https://docs.google.com/document/d/16E6ju6rFt29Xl936TdufwYYIlef7gzdIZUBCJQjKZ2c/edit?usp=sharing

The `docs` folder contains the actual contents of the wiki, while `theme` contains fonts, layouts, styling, etc. If you're looking to add to the wiki, check `docs`, navigate to a category, and either make a new page or edit an existing one.

The docs are written in [Markdown](https://daringfireball.net/projects/markdown/) with a couple of different extensions. MkDocs has a [guide](https://www.mkdocs.org/user-guide/writing-your-docs/#writing-with-markdown) on this.

## Building the wiki locally

If you want to build and check the wiki locally before pushing a change to the actual wiki, you can start a local server. Here are the steps:

- Clone the project
- Install python and pip
- *Optional:* Create a [virtual environment](https://docs.python.org/3/tutorial/venv.html)
- Run `pip install -r requirements.txt`
- Start the local server with `mkdocs serve`

The wiki is built using [MkDocs](https://www.mkdocs.org/), which has its own [installation instructions](https://www.mkdocs.org/#installation). Refer to that for more details.


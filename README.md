# Blog

Published at [glalon.de](https://glalon.de), using the custom
[`cinnastyx` theme](https://github.com/glalonde/cinnastyx).

## Setup

Install **Hugo 0.169.0** from the [official releases](https://github.com/gohugoio/hugo/releases/tag/v0.169.0)
and put `hugo` on your PATH. This version is recorded in `.hugo-version` and pinned
in the GitHub Actions workflow. Sass and Node are not required.

```sh
git submodule update --init --recursive
hugo version
hugo server
```

## Build and check

```sh
hugo --minify --panicOnWarning
python3 themes/cinnastyx/tests/test_build.py
```

The theme checks cover all four color schemes, pagination, image attributes,
metadata, and links when hosted under a URL subdirectory. Set `HUGO=/path/to/hugo`
for the Python checks if needed.

GitHub Actions checks pull requests and deploys pushes to `master` to GitHub Pages.
The production base URL is `https://glalon.de/`.

## Theme development

Edit the theme in `themes/cinnastyx`. It is a separate Git repository: commit and
push theme changes there first, then commit the updated submodule pointer in this
blog repository. Otherwise fresh clones and CI cannot use the local theme edits.

To deliberately pull a newer published theme revision:

```sh
git submodule update --remote themes/cinnastyx
```

Review and test the new revision before committing the submodule pointer.

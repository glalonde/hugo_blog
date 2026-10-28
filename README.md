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

## Photo essays

The road trip post in `content/posts/colorado-utah-road-trip/` is an example.
Keep selected, high-quality JPEG exports in the post's `images/` directory; keep
camera filenames so the exports can be traced back to the photo library. Name
the hero `featured-<camera filename>.jpg`.

Set `photoEssay: true`, `draft: true`, and `build.publishResources: false` in the
post's front matter. Add descriptive alt text under `photos`, keyed by the
lowercase filename without its extension. Arrange full-width photographs and
pairs with:

```go-html-template
{{< photo-row "DSC03549" >}}
{{< photo-row "DSC03547" "DSC03564" >}}
```

The photo-essay templates generate responsive WebP (quality 82) and JPEG
(quality 85) variants up to 2560px wide without upscaling. Photos in the essay
retain their aspect ratio and load lazily; the hero loads eagerly. Clicking an
essay photo opens a viewer with a compressed image capped at 2560px on its longest
side. Close it with Escape, the Close button, or the space around the image.
Without JavaScript, the link opens the compressed JPEG directly. Social
previews also use a resized image. Source JPEGs are not published for these
posts, although committing them will store them in the source repository.
Generated files remain outside source control. The normal GitHub Actions Hugo
build performs the same processing when a post is published and caches processed
images between runs. Cold photo builds have a five-minute rendering timeout.

Preview drafts with `hugo server --buildDrafts`; normal production builds exclude
them. Check the sequence, captions, and dates before changing `draft` to `false`.

## Theme development

Edit the theme in `themes/cinnastyx`. It is a separate Git repository: commit and
push theme changes there first, then commit the updated submodule pointer in this
blog repository. Otherwise fresh clones and CI cannot use the local theme edits.

To deliberately pull a newer published theme revision:

```sh
git submodule update --remote themes/cinnastyx
```

Review and test the new revision before committing the submodule pointer.

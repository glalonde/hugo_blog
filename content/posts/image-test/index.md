---
title: "How This Blog Handles Images"
date: 2021-05-30T14:41:22-07:00
lastmod: 2026-10-28
summary: "High-quality photo exports in, responsive images out. Hugo does the resizing and compression during the GitHub Actions build."
photoEssay: true
featuredAlt: "A close-up of green moss and small plants."
build:
  publishResources: false
photos:
  cactus_flower: "A cactus flower in bloom."
---

Updated October 28, 2026.

The goal is to choose photos, put them in a post, and let the build handle the web-sized copies. Lightroom and Google Photos remain the photo libraries. The blog gets selected JPEG exports, not an entire library or a set of camera RAW files.

The [Spring 2025 road trip](/posts/colorado-utah-road-trip/) was the first full test: 32 supplied JPEGs totaling about 179 MiB. Their 1600px WebP versions total about 5.8 MiB. That is one size per photo, not the total of every generated variant or a fixed page-download size.

## One source file per photo

Each post is a Hugo page bundle: a folder containing `index.md` and an `images/` directory. The selected exports keep their camera filenames. A filename containing `featured` identifies the image used on the homepage card and at the top of the article.

```text
content/posts/a-trip/
├── index.md
└── images/
    ├── featured-DSC03797.jpg
    ├── DSC03549.jpg
    └── DSC03547.jpg
```

Importing is still a separate step. For the road trip, a downloaded ZIP was unpacked and the photos arranged into a post. There is no automatic Lightroom or Google Photos sync, and GitHub Actions does not select photos or write captions.

## Arrange the photos in Markdown

Photo posts opt into the newer pipeline with `photoEssay: true`. Alt text lives in the front matter, keyed by the lowercase filename without `.jpg`:

```yaml
photoEssay: true
featuredAlt: "Sunset over sandstone towers."
build:
  publishResources: false
photos:
  dsc03549: "Snow-covered mountains above a lake."
  dsc03547: "A hiker looking across the water."
```

The `photo-row` shortcode accepts exact filenames without the `.jpg` extension. One photo fills the row; two sit side by side and stack on phones.

```text
{{</* photo-row "DSC03549" */>}}
{{</* photo-row "DSC03549" "DSC03547" */>}}
```

The shortcode finds the page resources and passes them to a shared `photo-image.html` partial. That partial generates the image variants and the HTML. Missing photos or missing body-photo alt text fail the build rather than leaving broken images on the page.

Here is the same pipeline working on the cactus photo from the original version of this post:

{{< photo-row "cactus_flower" >}}

## What the build produces

Hugo generates WebP at quality 82 and JPEG at quality 85, using Lanczos resampling. The responsive widths are 480, 960, 1600, and up to 2560 pixels, limited by the source width so small images are not enlarged.

The resulting `<picture>` element offers WebP with a JPEG fallback. Its `srcset` and `sizes` attributes let the browser choose a version for the image's display size and the screen's pixel density. Body photos load lazily; the hero loads eagerly. Photos in the body keep their original aspect ratios.

Clicking a photo opens a larger compressed WebP in a viewer, capped at **2560 pixels on the longest edge**. Without JavaScript, the link opens a similarly sized JPEG. Neither link points to the source export. The social-sharing preview is also resized, to at most 1200 pixels wide.

`build.publishResources: false` prevents Hugo from automatically copying every source image into the published site. The templates reference only processed versions for these posts. This does not make the source files private: they are still committed to this blog's Git repository.

## What happens when I push

A push to `master` starts GitHub Actions. It checks the theme, restores the processed-image cache, runs `hugo --minify --panicOnWarning`, and publishes the output to GitHub Pages.

Generated images are cached in `resources/_gen/images`, which is excluded from source control. Each commit can restore a cache from an earlier build using the same Hugo version. Text edits still rebuild the HTML, but unchanged image transformations can be reused. The first subtitle correction to the road-trip post restored the cache and completed the Hugo build in **150 ms**; checkout and deployment took additional time.

New photos or different processing settings require new variants. If the cache is missing or expires, Hugo regenerates them. The rendering timeout is five minutes to allow for a cold photo build.

## Where this applies

This post and the road-trip post use the newer photo-essay pipeline. Older posts still use the theme's `responsive-image` partial, which generates 300, 600, 1000, and 2000px variants in the source format and includes the original as a candidate. Ordinary Markdown image links do not automatically use the new pipeline.

The current approach keeps the writing format simple and leaves compression to the build. The remaining manual work is choosing the photos, importing the exports, and deciding their order.

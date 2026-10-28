---
title: "How This Blog Handles Images"
date: 2021-05-30T14:41:22-07:00
lastmod: 2026-10-28
summary: "Choose the photos, arrange the post, and let Hugo handle the resizing and compression."
photoEssay: true
featuredAlt: "A close-up of green moss and small plants."
build:
  publishResources: false
photos:
  cactus_flower: "A cactus flower in bloom."
---

I want to spend time choosing photos and writing, without manually exporting a thumbnail, a mobile version, and a larger copy of every image.

The photos live in Lightroom and Google Photos. Selected JPEG exports go into a folder alongside the post. Importing and arranging them is still a separate step; the rest happens when the site builds.

A small Hugo shortcode puts a photo into the page:

```text
{{</* photo-row "cactus_flower" */>}}
```

It can also take a pair of photos, placing them side by side on desktop and stacking them on phones. Behind that shortcode, a shared template generates compressed WebP and JPEG versions. The browser picks a suitable size, and photos farther down the page load as needed.

{{< photo-row "cactus_flower" >}}

Click a photo to see a larger, compressed version. For these photo posts, the website serves the generated copies; the source exports stay in the repository.

Pushing a post runs Hugo in GitHub Actions and publishes the result to GitHub Pages. Processed images are cached, so editing a sentence usually reuses the photos instead of compressing them again.

The [road-trip post](/posts/colorado-utah-road-trip/) uses this setup, as does this example. The configuration and template details are in the [repository](https://github.com/glalonde/hugo_blog#photo-essays).

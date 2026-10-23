# The datasheets folder — your local library

This folder is where your own downloaded copies of manufacturer
datasheets live, for quick reference at the bench. Manufacturer websites
are not always easy to search, and a local copy is instant.

## What is and is not in the repo

- **Committed:** this README and `manifest.md`.
- **Not committed:** the PDF files themselves. The repo's `.gitignore`
  excludes `datasheets/*.pdf`, so your copies stay on your machine.

Datasheets are the manufacturers' own documents, published for
customers to download and use. This book links to the official source of
every datasheet it relies on rather than republishing the PDFs —
respecting the manufacturers' terms, keeping the repo small, and
avoiding a worse trap: a frozen PDF that never tells you the
manufacturer revised it.

## The manifest is the index

`manifest.md` lists every datasheet this book relies on: the part, the
manufacturer, the document number/title, the revision this book's
values were verified against, and the official URL. With it, anyone can
rebuild this local library exactly:

1. Open `manifest.md`.
2. Download each datasheet from its official URL.
3. Save it here under the filename given in the manifest.

If a link ever stops working, search the manufacturer site (or the web)
for the **document number** in the manifest — that identifier finds the
exact document even when URLs change.

## Naming convention

One file per part, named:

```text
<manufacturer>-<part>.pdf
```

in lowercase, e.g. `onsemi-mmbt3904.pdf`, `nexperia-74hc00.pdf`.
Where one datasheet covers a whole family (common for 74-series parts),
the filename uses the family part number and the manifest notes the
covered variants.

# The Nature of Code (2024 p5.js update!)

This repo contains all the files for [the Nature of Code book](https://natureofcode.com/). The source content for the book is in a private Notion database and imported here as raw HTML files (which are then used to build the print PDF and gatsby website).

If you are looking for the 2012 Nature of Code book, [the website is archived here](https://noc-processing-archive.netlify.app/) along with the [GitHub source archive](https://github.com/nature-of-code/Nature-of-Code-Website-Archive).

![Data flow chart showing three parts: edit, store, and output.](docs/images/data-flow.png)

## Edit & Import

![Notion Database Screenshot](docs/images/notion-database.png)

Content are stored in a Notion Database with the following attributes:

- Type (`Page` | `Chapter`): to be handled differently during builds, now only act in the website build.
- Title: defines the title
- Status (`Draft` | `Published`): only `Published` ones will be imported
- File Name: defines the page sequence in a pdf build
- Slug: defines the path in web page URL

Each entity also contains a page of its content, which will be transformed to `html` files based on the [schema](docs/import-schemes.md). The transformation script ([nature-of-code/fetch-notion](https://github.com/nature-of-code/fetch-notion)) is written in Node.js, utilized as a GitHub action.

## Build

Following are the steps to build the book and website, however, you will have to skip the `import-notion-docs` as that can only be done with the Notion API key associated with the book. You can find the latest HTML version of the book in `/content`.

```bash
# Install Dependencies
npm install

# Build PDF (Magicbook) in `build` directory
npm run build:pdf

# Build Website in `public` directory
npm run build
```

## Exercise Solutions

There are some exercises through out the book that may be open ended and can have multiple solutions. If you would like to submit a solution for these exercises, please open an issue with the exercise number and a link to your p5 sketch. We will review the sketch and add to the website. You are welcome to leave your name in the sketch, we would love to credit you!

There is also passenger showcase on the [Coding Train website](https://thecodingtrain.com/tracks/the-nature-of-code-2), where you can submit creative intepretations of the book content and exercises.

## Example Ports to Other Languages

On this [page](https://github.com/nature-of-code/noc-examples-processing?tab=readme-ov-file#ports-to-other-languages), you can find a repository of ports to other programming languages on the topic of Nature of Code.

If you would like to add a resource to this list, please open an issue with the title and link to your resource.

## Errata

On the [Errate page](https://github.com/nature-of-code/noc-book-2/blob/main/errata.md), we are keeping track of since the publication date (9/3/2024). If you would like to submit an error, please file an issue on our GitHub page, and we will fix the website version and keep track of the error for the printed book.

## Attributions

Icons used in this project:

🖍️ (Crayon) & 🦜 (Parrot) & 🔎 (Magnifying glass) from [OpenMoji](https://openmoji.org/) – [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/#)

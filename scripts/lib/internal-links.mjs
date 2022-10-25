import { visit } from 'unist-util-visit';
import { headingRank } from 'hast-util-heading-rank';
import Slugger from 'github-slugger';

const slugger = new Slugger();

export function handlePagesInternalLinks(pages) {
  // create a map from pageId to page path
  const idPathMap = {};
  pages.forEach((page) => {
    const path = `/${page.id.replace(/-/g, '')}`;
    idPathMap[path] = `/${page.properties['Slug']}`;
  });

  // Add id for all headings and save the relationship between notionId & anchor as a map
  const idAnchorMap = pages
    .map(slugifyHeadingsId)
    .reduce((pre, cur) => Object.assign(pre, cur), {});

  // Update internal links href to path and anchor instead of ids
  pages.map((page) => {
    visit(page.hast, { tagName: 'a' }, async (node) => {
      if (!node.properties.href || node.properties.href.indexOf('://') > 0) {
        return;
      }
      // if not valid link href
      const regex = /^\/[0-9a-f]+#?[0-9a-f]+$/;
      if (!regex.test(node.properties.href)) {
        return;
      }

      // path and anchors represented by notion's id
      const [idPath, idAnchor] = node.properties.href.split('#');

      const isCurrentPage = idPath === `/${page.id.replace(/-/g, '')}`;
      const path = isCurrentPage ? '' : idPathMap[idPath] || '';
      const anchor = idAnchorMap[idAnchor] || '';

      // set slugified path and anchors
      node.properties.href = `${path}#${anchor}`;
    });
  });
}

function slugifyHeadingsId({ hast }) {
  const idSlugMap = {};

  visit(hast, 'element', (node) => {
    // visit all headings from `h1` to `h6`
    if (headingRank(node)) {
      const slug = slugger.slug(
        node.children
          .filter((ele) => ele.type === 'text')
          .map((ele) => ele.value)
          .join(''),
      );

      node.properties.id = slug;

      // save the notionId -> slug reference to a map
      if (node.properties.dataNotionId) {
        idSlugMap[node.properties.dataNotionId] = slug;
        delete node.properties.dataNotionId;
      }
    }
  });

  visit(hast, { tagName: 'div' }, (node) => {
    // visit all callout blocks
    if (
      node.properties.dataType &&
      (node.properties.dataType === 'note' ||
        node.properties.dataType === 'exercise' ||
        node.properties.dataType === 'project' ||
        node.properties.dataType === 'example')
    ) {
      const slug = node.children
        .filter((ele) => ele.type === 'element' && ele.tagName === 'h3')
        .map((ele) => ele.properties.id)[0];

      // save the notionId -> slug reference to a map
      if (node.properties.dataNotionId) {
        idSlugMap[node.properties.dataNotionId] = slug;
        delete node.properties.dataNotionId;
      }
    }
  });

  return idSlugMap;
}

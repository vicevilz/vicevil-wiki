import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import navigation from './config/navigation/sidebar.json';

type NavigationItem = {
  _template: 'doc' | 'category' | 'link';
  document?: string;
  label?: string;
  href?: string;
  link?: 'generated' | 'none';
  collapsed?: boolean;
  items?: NavigationItem[];
};

const getDocId = (document: string) => document
  .replace(/\.mdx?$/, '')
  .split('/')
  .slice(1)
  .map((segment) => segment.replace(/^\d+-/, ''))
  .join('/');

const toSidebarItem = (item: NavigationItem): unknown[] => {
  if (item._template === 'doc' && item.document) {
    return [{type: 'doc', id: getDocId(item.document), ...(item.label ? {label: item.label} : {})}];
  }

  if (item._template === 'link' && item.label && item.href) {
    return [{type: 'link', label: item.label, href: item.href}];
  }

  if (item._template === 'category' && item.label) {
    return [{
      type: 'category',
      label: item.label,
      collapsed: item.collapsed ?? false,
      ...(item.link === 'generated' ? {link: {type: 'generated-index'}} : {}),
      items: (item.items ?? []).flatMap(toSidebarItem),
    }];
  }

  return [];
};

const sidebars: SidebarsConfig = {
  wikiSidebar: (navigation.items as NavigationItem[]).flatMap(toSidebarItem) as SidebarsConfig[string],
};

export default sidebars;

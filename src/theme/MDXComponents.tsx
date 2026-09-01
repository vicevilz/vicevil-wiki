import MDXComponents from '@theme-original/MDXComponents';
import CodeBlock from '@theme/CodeBlock';
import Details from '@theme/Details';
import DocCardList from '@theme/DocCardList';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import {ButtonLink, CardGrid, ImageGallery, Steps, YouTubeEmbed} from '@site/src/components/WikiBlocks';

export default {
  ...MDXComponents,
  Admonition: MDXComponents.admonition,
  ButtonLink,
  CardGrid,
  CodeBlock,
  Details,
  DocCardList,
  ImageGallery,
  Steps,
  Tabs,
  TabItem,
  TOCInline,
  YouTubeEmbed,
};

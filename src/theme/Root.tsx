import type {CSSProperties, ReactNode} from 'react';
import settings from '../../config/site/settings.json';

type ThemeVariables = CSSProperties & Record<`--${string}`, string>;

export default function Root({children}: {children: ReactNode}) {
  const style: ThemeVariables = {
    '--wiki-primary-light': settings.primaryColor,
    '--wiki-primary-dark': settings.darkPrimaryColor,
  };
  return <div className="wiki-theme-root" style={style}>{children}</div>;
}

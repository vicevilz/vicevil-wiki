import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const plugins = [
  {name: 'vElevators', description: 'Instalación, comandos, permisos y configuración.', href: '/docs/velevators/'},
  {name: 'vCombat', description: 'Instalación, comandos, permisos y configuración.', href: '/docs/vcombat/'},
  {name: 'vLottery', description: 'Instalación, comandos, permisos y configuración.', href: '/docs/vlottery/'},
  {name: 'vStaff', description: 'Instalación, comandos, permisos y configuración.', href: '/docs/vstaff/'},
];

export default function Home(): ReactNode {
  return (
    <Layout title="Inicio" description="Documentación oficial de los plugins de Vicevil para Minecraft.">
      <main>
        <section className={styles.hero}>
          <div className="container">
            <span className={styles.eyebrow}>Documentación oficial</span>
            <Heading as="h1">Todo lo que necesitas para configurar los plugins de Vicevil</Heading>
            <p>Guías claras de instalación, comandos, permisos y configuración.</p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/docs/inicio">Empezar</Link>
              <a className="button button--secondary button--lg" href="https://vicevil.wiki/admin/">Editar documentación</a>
            </div>
          </div>
        </section>
        <section className={styles.plugins}>
          <div className="container">
            <Heading as="h2">Plugins</Heading>
            <div className={styles.grid}>
              {plugins.map((plugin) => (
                <Link key={plugin.name} className={styles.card} to={plugin.href}>
                  <span className={styles.cardIcon}>V</span>
                  <Heading as="h3">{plugin.name}</Heading>
                  <p>{plugin.description}</p>
                  <span className={styles.cardLink}>Ver documentación →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}


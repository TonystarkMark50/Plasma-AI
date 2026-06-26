import { ArrowPath, ArrowTrendingUp, ChartPie, Cog8Tooth, LinkSolid, Cube16Solid } from '../assets/svgs';

export const FEATURES = [
  {
    /* arrow-path.svg — Features bento card "Automated Pipelines" */
    id: 'pipelines',
    title: 'Automated Pipelines',
    description: 'Build, deploy, and monitor intelligent data flows without writing infrastructure code.',
    Icon: ArrowPath,
    gridArea: 'pipelines',
  },
  {
    /* arrow-trending-up.svg — Features bento card "Real-time Analytics" */
    id: 'analytics',
    title: 'Real-time Analytics',
    description: 'Stream processing with sub-150ms latency across all your data sources.',
    Icon: ArrowTrendingUp,
    gridArea: 'analytics',
  },
  {
    /* chart-pie.svg — Features bento card "Usage Intelligence" */
    id: 'intelligence',
    title: 'Usage Intelligence',
    description: 'Understand exactly where compute is spent with granular attribution dashboards.',
    Icon: ChartPie,
    gridArea: 'intelligence',
  },
  {
    /* cog-8-tooth.svg — Features bento card "Smart Configuration" */
    id: 'config',
    title: 'Smart Configuration',
    description: 'Declarative pipeline config that adapts automatically to your data schema.',
    Icon: Cog8Tooth,
    gridArea: 'config',
  },
  {
    /* link-solid.svg — Features bento card "Deep Integrations" */
    id: 'integrations',
    title: 'Deep Integrations',
    description: 'Connect to 200 plus services with pre-built connectors and a universal API.',
    Icon: LinkSolid,
    gridArea: 'integrations',
  },
  {
    /* cube-16-solid.svg — Features bento card "3D Data Modeling" */
    id: 'modeling',
    title: '3D Data Modeling',
    description: 'Visualize complex data relationships in three-dimensional space.',
    Icon: Cube16Solid,
    gridArea: 'modeling',
  },
];

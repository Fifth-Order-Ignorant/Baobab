import Head from 'next/head';
import styles from '../styles/Landing.module.css';
import { Typography } from 'antd';

const { Title } = Typography;
export default function Home(): JSX.Element {
  return (
    <div className={styles.container}>
      <Head>
        <title>Baobab</title>
        <meta
          name="description"
          content="Baobab: Your Learning and Networking Platform"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <img
        style={{ maxHeight: '50vh' }}
        src="/transparentlogo.png"
        alt="logo"
      />
      <Title
        style={{
          marginBottom: '0px',
          padding: '0px',
          textAlign: 'center',
        }}
      >
        baobab
      </Title>
      <Title
        level={4}
        style={{
          margin: '0px',
          textAlign: 'center',
        }}
      >
        <i>(&lsquo;bau·bab&rsquo;)</i>
      </Title>
      <Title
        level={5}
        style={{
          margin: '0px',
          textAlign: 'center',
        }}
      >
        The tree of life. A symbol of positivity. A tree that thrives where
        little else can.
        <br />
        Your new opportunity.
      </Title>
    </div>
  );
}

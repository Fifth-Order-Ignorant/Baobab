import { Card as AntCard } from 'antd';
import { PropsWithChildren } from 'react';
import styles from '../../styles/Card.module.css';

/**
 * Renders another variation of the ANT-UI card.
 */
export default function Card(
  props: PropsWithChildren<{ children: JSX.Element }>,
): JSX.Element {
  return <AntCard className={styles.card}>{props.children}</AntCard>;
}

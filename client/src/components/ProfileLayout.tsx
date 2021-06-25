import { About } from './About';
import { PropsWithChildren } from 'react';
import { Row, Col } from 'antd';

/**
 * Renders the profile layout.
 * @param props.children JSX Element that will be using this component
 */
export default function ProfileLayout(props: PropsWithChildren<{ children: JSX.Element }>): JSX.Element {
    return (
      <div>
        <Row>
          <Col>
            <About />
          </Col>
        </Row>
        <Row>
          {props.children}
        </Row>
      </div>
    );
  }
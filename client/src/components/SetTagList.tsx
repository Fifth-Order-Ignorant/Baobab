import { useState } from 'react';
import { Col, Row, Button, AutoComplete, Tag } from 'antd';
import TagToColor from '../constants/TagToColor';
import Tags from '../constants/Tags';

/**
 * Renders the list of tags for the send post component.
 * @param props Contains a function that passes in the current tags.
 */
export default function SetTagList(props: {
  onTagChange: (tags: string[]) => void,
  tags: string[]
}): JSX.Element {
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState('');

  const options = [];
  for (let i = 0; i < Tags.length; i++) {
    options.push({ value: Tags[i] });
  }

  const handleClose = (removedTag: string) => {
    const newTags: string[] = props.tags.filter((tag) => tag !== removedTag);
    props.onTagChange(newTags);
    setInputTag('');
  };

  const addTag = () => {
    if (
      Tags.some((tag) => tag === inputTag) &&
      !props.tags.some((tag) => tag === inputTag)
    ) {
      const newTags: string[] = props.tags;
      newTags.push(inputTag);
      props.onTagChange(newTags);
    }
    setInputTag('');
  };

  return (
    <div>
      <Row>
        <Col span={16}>
          {props.tags.map((tag) => (
            <Tag
              closable
              color={TagToColor[tag]}
              key={tag}
              onClose={() => {
                handleClose(tag);
              }}
            >
              {tag}
            </Tag>
          ))}
        </Col>
        <Col span={8}>
          <AutoComplete
            options={options}
            style={{ width: 200 }}
            value={inputTag}
            onChange={setInputTag}
            filterOption={(inputValue, option) => {
              if (option !== undefined) {
                return (
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                );
              }
              return false;
            }}
          />
          <Button onClick={addTag}>Add Tag</Button>
        </Col>
      </Row>
    </div>
  );
}

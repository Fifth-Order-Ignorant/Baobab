import { Tag } from 'antd';
import TagToColor from '../constants/TagToColor';

/**
 * Renders tags of the given post.
 * @param props Contains list of tags
 */
export default function TagList(props: { tags: string[] }): JSX.Element {
  return (
    <div>
      {props.tags.map((tag) => (
        <Tag color={TagToColor[tag]} key={tag}>
          {tag}
        </Tag>
      ))}
    </div>
  );
}

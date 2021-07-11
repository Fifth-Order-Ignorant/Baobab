import { Tag } from 'antd';
import TagToColor from '../constants/TagToColor';

/**
 * Renders tags
 * @param props Contains list of tags
 */
export function TagList(props: { tags: string[] }) {
    return (
        <div>
            {
                props.tags.map(tag => (
                    <Tag color={TagToColor[tag]}>{tag}</Tag>
                ))
            }
        </div>
    )
}
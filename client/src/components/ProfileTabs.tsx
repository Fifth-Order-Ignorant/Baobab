import { Tabs } from 'antd';

/**
 * Required props for rendering profile tabs
 */
export interface ProfileTabsProps {
    /**
     * The profile page
     */
    profile: JSX.Element;
    /**
     *  The activity page
     */
    activity: JSX.Element;
}

/**
 * Renders the profile page.
 */
export function ProfileTabs(props: ProfileTabsProps): JSX.Element {

    return (
        <Tabs defaultActiveKey="profile" type="card">
            <Tabs.TabPane tab="Profile" key="profile">
                {props.profile}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Activity" key="activity">
                {props.activity}
            </Tabs.TabPane>
        </Tabs>
    );
}

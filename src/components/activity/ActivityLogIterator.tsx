import { Fragment, useState } from 'react';

import { Button, Divider, List } from '@mui/material';

import {
  COMPANY_CREATED,
  CONTACT_CREATED,
  CONTACT_NOTE_CREATED,
  DEAL_CREATED,
  DEAL_NOTE_CREATED,
} from '@/consts';
import { Activity } from '@/types';

import { ActivityLogCompanyCreated } from './ActivityLogCompanyCreated';
import { ActivityLogContactCreated } from './ActivityLogContactCreated';
import { ActivityLogContactNoteCreated } from './ActivityLogContactNoteCreated';
import { ActivityLogDealCreated } from './ActivityLogDealCreated';
import { ActivityLogDealNoteCreated } from './ActivityLogDealNoteCreated';

type ActivityLogIteratorProps = {
  activities: Activity[];
  pageSize: number;
};

export function ActivityLogIterator({
  activities,
  pageSize,
}: ActivityLogIteratorProps) {
  const [activitiesDisplayed, setActivityDisplayed] = useState(pageSize);

  const filteredActivities = activities.slice(0, activitiesDisplayed);

  return (
    <List
      sx={{
        '& .MuiListItem-root': {
          marginTop: 0,
          marginBottom: 1,
        },
        '& .MuiListItem-root:not(:first-of-type)': {
          marginTop: 1,
        },
      }}
    >
      {filteredActivities.map((activity, index) => (
        <Fragment key={index}>
          <ActivityItem key={activity.id} activity={activity} />
          <Divider />
        </Fragment>
      ))}

      {activitiesDisplayed < activities.length && (
        <Button
          onClick={() =>
            setActivityDisplayed(
              activitiesDisplayed => activitiesDisplayed + pageSize
            )
          }
          fullWidth
        >
          Load more activity
        </Button>
      )}
    </List>
  );
}

function ActivityItem({ activity }: { activity: Activity }) {
  if (activity.type === COMPANY_CREATED) {
    return <ActivityLogCompanyCreated activity={activity} />;
  }

  if (activity.type === CONTACT_CREATED) {
    return <ActivityLogContactCreated activity={activity} />;
  }

  if (activity.type === CONTACT_NOTE_CREATED) {
    return <ActivityLogContactNoteCreated activity={activity} />;
  }

  if (activity.type === DEAL_CREATED) {
    return <ActivityLogDealCreated activity={activity} />;
  }

  if (activity.type === DEAL_NOTE_CREATED) {
    return <ActivityLogDealNoteCreated activity={activity} />;
  }

  return null;
}

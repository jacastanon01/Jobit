import moment from 'moment';
import React from 'react';

const TimeFromNow = ({
  timestamp,
}: {
  timestamp?: number | null | undefined;
}) => {
  return <>{timestamp && moment(new Date(timestamp * 1000)).fromNow()}</>;
};

export default TimeFromNow;

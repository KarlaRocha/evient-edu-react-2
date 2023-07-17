import * as React from 'react';
import { Item } from '../interfaces';

type Props = {
  level: Item['level'];
  edit: boolean;
};
const initialProps = { level: -1, edit: false };
export const Level = ({ level, edit }: Props = initialProps) => {
  let variant = '',
    label = '';
  switch (level) {
    case 0:
      variant = 'secondary';
      label = 'Low';
      break;
    case 1:
      variant = 'warning';
      label = 'Medium';
      break;
    case 2:
      variant = 'primary';
      label = 'High';
      break;
    default:
      break;
  }
  return (
    <>
      <span
        className={`h-50 my-auto badge bg-${variant} ${
          edit ? 'd-none' : 'd-block'
        }`}
      >
        {label}
      </span>
      <select
        placeholder="Level"
        name="level"
        className={`form-control ${edit ? 'd-block' : 'd-none'}`}
        defaultValue={level}
      >
        <option value={0}>Low</option>
        <option value={1}>Medium</option>
        <option value={2}>High</option>
      </select>
    </>
  );
};

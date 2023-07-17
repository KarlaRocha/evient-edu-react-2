import React, { useState, FormEvent } from 'react';
import { Level } from '../components';
import { Item as TodoItem } from '../interfaces';

type Props = {
  id: number;
  onDeleteItem(id: number): void;
  onUpdateItem(id: number, args: TodoItem): void;
} & TodoItem;
export const Item = ({
  id,
  title,
  message,
  level,
  onDeleteItem,
  onUpdateItem,
}: Props) => {
  const [edit, setEdit] = useState(false);
  return (
    <form
      onSubmit={(
        e: FormEvent<HTMLFormElement> & {
          target: {
            title?: { value?: string };
            message?: { value?: string };
            level?: { value?: string };
          };
        }
      ) => {
        e.preventDefault();
        setEdit(false);
        onUpdateItem(id, {
          title: e.target?.title?.value ?? title,
          message: e.target?.message?.value ?? message,
          level: Number(e.target?.level?.value ?? level),
        });
      }}
    >
      <div className="card mb-2" style={{ width: 600 }}>
        <div className="card-header d-flex flex-row justify-content-between">
          <div className="d-flex flex-row">
            <Level level={level} edit={edit} />
            <input
              className={`form-control ${edit ? 'd-block' : 'd-none'}`}
              type="text"
              name="title"
              defaultValue={title}
            />
            {!edit && <h3 className="px-2 my-auto">{title}</h3>}
          </div>
          <div>
            <button
              type="submit"
              className={`btn btn-success ${edit ? 'd-inline' : 'd-none'}`}
            >
              Accept
            </button>
            <button
              onClick={() => setEdit(true)}
              type="button"
              className={`btn btn-light ml-auto ${
                edit ? 'd-none' : 'd-inline'
              }`}
            >
              Edit
            </button>
            <button
              onClick={() => onDeleteItem(id)}
              type="button"
              className="btn btn-danger ml-auto"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="card-body">
          <textarea
            className={`form-control ${edit ? 'd-block' : 'd-none'}`}
            name="message"
            cols={50}
            rows={2}
            defaultValue={message}
          ></textarea>
          {!edit && <p className="px-2 my-auto">{message}</p>}
        </div>
      </div>
    </form>
  );
};

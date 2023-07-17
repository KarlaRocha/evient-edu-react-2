import React, { useState, useMemo } from 'react';

import { NewItemModal, Item } from '../components';
import { Item as TodoItem } from '../interfaces';

export const TodoList = () => {
  const [data, setData] = useState<TodoItem[]>([
    { title: 'test', message: 'test message', level: 1 },
  ]);
  const [searchText, setSearchText] = useState('');
  const [level, setLevel] = useState(-1);

  const filters = (data: TodoItem[]) => {
    return data.filter((d: TodoItem) => {
      const title = d?.title ?? '';
      const textInTitle = title.includes(searchText);
      const message = d?.message ?? '';
      const textInMessage = message.includes(searchText);
      const isAllLevels = level === -1;
      return (textInTitle || textInMessage) && isAllLevels
        ? true
        : d.level === level;
    });
  };

  const filterdItems = useMemo(() => filters(data), [searchText, level, data]);

  const onCreateNewItem = ({ title, message, level }: TodoItem) => {
    setData((prev) => [...prev, { title, message, level }]);
  };

  const onDeleteItem = (id: number) => {
    let auxData = [...data];
    auxData.splice(id, 1);
    setData(auxData);
  };

  const onUpdateItem = (id: number, newData: TodoItem) => {
    let auxData = [...data];
    auxData[id] = newData;
    setData(auxData);
  };

  return (
    <div className="container d-flex flex-column align-items-center py-3">
      <div className="">
        <h1 className="text-center mb-4">Todo List</h1>
        <div className="row mb-5 px-0">
          <div className="col-8 ">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <select
                placeholder="Level"
                name="level"
                className="btn btn-outline-secondary"
                defaultValue={level}
                onChange={(e) => setLevel(Number(e.target.value))}
              >
                <option value={-1}>All</option>
                <option value={0}>Low</option>
                <option value={1}>Medium</option>
                <option value={2}>High</option>
              </select>
            </div>
          </div>
          <div className="col">
            <NewItemModal onCreateNewItem={onCreateNewItem} />
          </div>
        </div>
        {filterdItems.map((item, index) => (
          <Item
            key={Math.random()}
            id={index}
            title={item.title}
            message={item.message}
            level={item.level}
            onDeleteItem={onDeleteItem}
            onUpdateItem={onUpdateItem}
          />
        ))}
      </div>
    </div>
  );
};

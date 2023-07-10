import { useState, useMemo } from 'react';

function NewItemModal({ onCreateNewItem }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#newItemModal"
        onClick={() => setShowModal(true)}
      >
        Create New Item
      </button>
      {showModal && (
        <div
          style={{
            position: 'absolute',
            zIndex: 2000,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#00000030',
          }}
        >
          <div className="card m-auto" style={{ width: 400, height: 'auto' }}>
            <div className="card-header d-flex justify-content-between">
              <h5>Create New Item</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowModal(false);
                onCreateNewItem({
                  title: e.target?.title?.value ?? '',
                  message: e.target?.message?.value ?? '',
                  level: Number(e.target?.level.value ?? 0),
                });
              }}
            >
              <div className="card-body">
                <div className="modal-body">
                  <label htmlFor="title">Title</label>
                  <input
                    className="form-control mb-2"
                    type="text"
                    name="title"
                    id="title"
                  />
                  <label htmlFor="message">Message</label>
                  <textarea
                    className="form-control mb-2"
                    type="text"
                    name="message"
                    id="message"
                  />
                  <label htmlFor="level">Level of Importance</label>
                  <select
                    placeholder="Level"
                    name="level"
                    id="level"
                    className="form-control mb-4"
                  >
                    <option className="text-muted" value={-1}>
                      Select Level
                    </option>
                    <option value={0}>Low</option>
                    <option value={1}>Medium</option>
                    <option value={2}>High</option>
                  </select>
                </div>
                <div className="card-footer bg-white d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-secondary mx-2"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function Level({ level, edit }) {
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
}

function Item({ id, title, message, level, onDeleteItem, onUpdateItem }) {
  const [edit, setEdit] = useState(false);
  return (
    <form
      onSubmit={(e) => {
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
            cols="50"
            rows="2"
            defaultValue={message}
          ></textarea>
          {!edit && <p className="px-2 my-auto">{message}</p>}
        </div>
      </div>
    </form>
  );
}

export function TodoList() {
  const [data, setData] = useState([
    { title: 'test', message: 'test message', level: 1 },
  ]);
  const [searchText, setSearchText] = useState('');
  const [level, setLevel] = useState(-1);

  const filters = (data) => {
    return data.filter((d) =>
      (d.title.includes(searchText) || d.message.includes(searchText)) &&
      level === -1
        ? true
        : d.level === level
    );
  };

  const filterdItems = useMemo(() => filters(data), [searchText, level, data]);

  const onCreateNewItem = ({ title, message, level }) => {
    setData((prev) => [...prev, { title, message, level }]);
  };

  const onDeleteItem = (id) => {
    let auxData = [...data];
    auxData.splice(id, 1);
    setData(auxData);
  };

  const onUpdateItem = (id, newData) => {
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
}

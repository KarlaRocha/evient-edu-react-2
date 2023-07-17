import React, { useState, FormEvent } from 'react';
import { Item } from '../interfaces';

type Props = {
  onCreateNewItem: (args: Item) => void;
};
export const NewItemModal = ({ onCreateNewItem }: Props) => {
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
                setShowModal(false);
                onCreateNewItem({
                  title: e.target?.title?.value ?? '',
                  message: e.target?.message?.value ?? '',
                  level: Number(e.target?.level?.value ?? 0),
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
};

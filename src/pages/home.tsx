import * as React from 'react';
import { Link } from 'react-router-dom';

import { pagePaths } from './pagePaths';

export const Home = () => {
  const pages = [
    {
      title: 'Todo List',
      path: pagePaths.todo,
    },
  ];
  return (
    <div className="container">
      <div className="row mt-3">
        {pages.map((page) => (
          <div className="col-3">
            <Link to={pagePaths.todo}>
              <a>
                <div className="card d-flex justify-content-center align-items-center p-3">
                  <h3>{page.title}</h3>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

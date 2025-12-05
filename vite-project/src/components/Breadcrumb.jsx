// components/Breadcrumb.jsx
import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="breadcrumb" className="py-3 bg-light border-bottom breadcrumb-fonts fw-bolbder">
      <div className="px-4 px-md-5">
        <ol className="breadcrumb mb-0 d-inline-flex align-items-center p-0 bg-transparent">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li
                key={index}
                className={`breadcrumb-item ${isLast ? "active text-danger fw-bold russo-one" : ""}`}
                aria-current={isLast ? "page" : undefined}
              >
                {isLast ? (
                  <span>{item.label}</span>
                ) : (
                  <Link
                    to={item.to || "#"}
                    className="text-muted text-decoration-none fw-medium hover-danger"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};
export default Breadcrumb;
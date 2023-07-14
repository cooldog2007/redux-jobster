import React from "react";

export const FormRow = ({
  type,
  options,
  name,
  value,
  handleChange,
  labelText,
}) => {
  if (type === "select")
    return (
      <div className="form-row" style={{ opacity: 1 }}>
        <label htmlFor={name} className="form-label">
          {labelText}
        </label>
        <select
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          className="form-select"
        >
          {options.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  return (
    <div className="form-row" style={{ opacity: 1 }}>
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <input
        type={type}
        id={name}
        value={value}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};

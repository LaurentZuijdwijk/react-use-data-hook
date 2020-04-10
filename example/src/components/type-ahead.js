import React, { useEffect, useState, useCallback, useRef } from "react";

import useDataHook from "react-use-data-hook";
const TypeAhead = ({ defaultValue, serviceFn, placeholder, label, listItemRenderFn }) => {
  const initialFetch = defaultValue ? true : false;
  const { data, loading, error, refetch } = useDataHook({ fn: serviceFn, initialFetch }, defaultValue);

  const values = data || [];
  if (error) {
    return <span>{error}</span>;
  }
  return (
   <div class="input-field col s3">
      <input
        autoFocus
        id={label}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={(e) => {
          refetch(e.target.value);
        }}
      />
      <label for={label} className="active">
        {label}
      </label>

      {loading && (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      )}
      {values.map((d) => {
        if (listItemRenderFn) return listItemRenderFn(d);
        return <div key={d}>{d} &nbsp;</div>;
      })}
      </div>
      );
};

export { TypeAhead };

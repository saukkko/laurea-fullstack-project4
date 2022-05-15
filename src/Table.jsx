import React from "react";
import PropTypes from "prop-types";

const classNames = {
  table: ["table-fixed", "w-full", "border-collapse", "border", "border-black"],
  thead: ["bg-slateblue/80"],
  tbody: [""],
  th: ["p-2"],
  td: ["break-all", "p-1"],
};

export const Table = ({ rawData, ...props }) => {
  /** @type {{ code: number, title: string, message: string, data: Record<string,unknown> | Record<string,unknown[]> }} */
  const { code, title, message, data } = rawData;
  const filterer = ["name", "username", "_id"];

  if (code === 404) return <span className="text-lg">No results</span>;

  if (message === "PATCH OK") {
    const patchData = { ...data.document, newName: data.updated.name };
    filterer.push("newName");
    console.log(patchData);
    return (
      <table className={classNames.table.join(" ")} {...props}>
        <THead
          filter={filterer}
          data={[patchData][0]}
          className={classNames.thead.join(" ")}
        />
        <TBody
          filter={filterer}
          data={[patchData]}
          className={classNames.tbody.join(" ")}
        />
      </table>
    );
  }

  if (title === "success") {
    return (
      <table className={classNames.table.join(" ")} {...props}>
        <THead
          filter={filterer}
          data={Array.isArray(data) ? data[0] : [data][0]}
          className={classNames.thead.join(" ")}
        />
        <TBody
          filter={filterer}
          data={Array.isArray(data) ? data : [data]}
          className={classNames.tbody.join(" ")}
        />
      </table>
    );
  }
  if (title === "error")
    return (
      <div>
        <span className="text-lg text-error">Error: {message}</span>
      </div>
    );
};

const THead = ({ filter, data, ...props }) => (
  <thead {...props}>
    <tr>
      {Object.keys(data)
        .filter((y) => filter.includes(y))
        .map((val, i) => (
          <th key={i} className={classNames.th.join(" ")}>
            {val}
          </th>
        ))}
    </tr>
  </thead>
);

const TBody = ({ filter, data, ...props }) => (
  <tbody {...props}>
    {data.map((x, i) => {
      return (
        <tr key={i}>
          {Object.entries(x)
            .filter((y) => filter.includes(y[0]))
            .map((val, j) => (
              <td key={j} className={classNames.td.join(" ")}>
                {val[1]}
              </td>
            ))}
        </tr>
      );
    })}
  </tbody>
);

THead.propTypes = {
  filter: PropTypes.array,
  data: PropTypes.object,
};
TBody.propTypes = {
  filter: PropTypes.array,
  data: PropTypes.arrayOf(PropTypes.object),
};
Table.propTypes = {
  rawData: PropTypes.object,
};

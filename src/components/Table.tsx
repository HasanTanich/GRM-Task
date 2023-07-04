import { type ListItem } from "../types/ListItem";

type TableProps = {
  data: ListItem[];
};

const Table = ({ data }: TableProps) => {
  return (
    <table className="min-w-full text-sm font-light text-center border">
      <thead className="font-medium border-b">
        <tr>
          <th
            scope="col"
            className="px-2 py-4 border-r -tracking-tighter bg-slate-100 "
          >
            Position
          </th>
          <th scope="col" className="px-6 py-4 border-r -tracking-tighter">
            Name
          </th>
          <th
            scope="col"
            className="py-4 border-r px- -tracking-tighter bg-slate-100"
          >
            Score
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr className="border-b" key={item.id}>
            <td className="px-6 py-4 font-medium border-r whitespace-nowrap bg-slate-100">
              {item.position}
            </td>
            <td className="px-6 py-4 border-r whitespace-nowrap">
              {item.name}
            </td>
            <td className="px-6 py-4 border-r whitespace-nowrap bg-slate-100">
              {item.score}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

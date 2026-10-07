import Input from './Input.jsx';
import Select from './Select.jsx';

export default function SearchFilterBar({ search, onSearch, filters = [], children }) {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:items-end mb-4">
      <Input
        placeholder="Search..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="flex-1"
      />
      {filters.map((f, i) => (
        <Select
          key={i}
          label={f.label}
          value={f.value}
          onChange={(e) => f.onChange(e.target.value)}
          options={f.options}
          className="md:w-48"
        />
      ))}
      {children}
    </div>
  );
}
export default function AppControl({ setGroup, setFilter, group, filter}) {
  return (
    <div className="app-control">
      <input className="control-item" type="text" value={filter} onChange={setFilter}/>
      <select className="control-item" value={group} onChange={setGroup}>
        <option value="NONE">{'None'}</option>
        <option value="FIRST">{'First Name'}</option>
        <option value="LAST">{'Last Name'}</option>
        <option value="MONTH">{'Birth Month'}</option>
      </select>
    </div>);
}

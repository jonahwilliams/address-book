
export default function Button({ handleClick, children })  {
  return (
    <div className='custom-button'
      onClick={handleClick}>
      { children }
    </div>
  );
}

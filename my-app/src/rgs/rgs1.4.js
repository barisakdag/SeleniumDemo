

function Button() {
    const [counter, setCounter] = useState(5)
    const handleClick = () => setCounter(counter*2);
    return (
      <button onClick={handleClick}>
          {counter}
       </button>
      );
  }
  
  ReactDOM.render(
    <Button />, 
    document.getElementById('mountNode'),
  );
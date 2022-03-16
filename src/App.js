import logo from './logo.svg';
import './App.css';
import VirtualTable from './VirtualTable/VirtualTable';
import HelpfulScrollbar from './HelpfulScrollbar/HelpfulScrollbar';

function App() {

  let data = [];
  for (let i=0; i<10000; i++) {
    data.push({name:"row" + i, age: 25, color: "green"});
  }
  let tableFormatting = {
    numberVisibleRows: 10,
    itemHeight: 20,
  };

  return (
    <div className="App">
      <HelpfulScrollbar displayedCount={10} totalCount={1000}></HelpfulScrollbar>
      <VirtualTable items={data} tableFormatting={tableFormatting}></VirtualTable>
    </div>
  );
}

export default App;

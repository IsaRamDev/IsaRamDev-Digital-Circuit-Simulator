import OrGate from './components/Or';
import AndGate from './components/And';
import NotGate from './components/Not';

function App() {
  return (
    <div>
      <OrGate inputA={1} inputB={0} />
      <AndGate inputA={1} inputB={0} />
      <NotGate inputA={1} inputB={0} />
    </div>
  )
}

export default App

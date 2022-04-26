import { createRoot } from "react-dom/client";
import { Button } from "antd";

const App = () => {
  return <Button>test</Button>;
};

createRoot(document.querySelector("#root")).render(<App />);

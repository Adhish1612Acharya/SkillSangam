import "./App.css";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function App() {
  return (
    <>
      <Alert variant="default | destructive">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert>
    </>
  );
}

export default App;

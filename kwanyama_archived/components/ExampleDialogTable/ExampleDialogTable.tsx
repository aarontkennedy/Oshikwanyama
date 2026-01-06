import { ExampleDialog } from "../../types/types";
import "./ExampleDialogTable.scss"

const ExampleDialogTable = ({
  exampleDialogs,
}: {
  exampleDialogs: ExampleDialog[];
}): JSX.Element | null => {
  return (
    <div className="example-dialog__container">
      {exampleDialogs.map((example, index: number) => (
        <div
          className="example-dialog__example"
          key={`${example.title}_${index}`}
        >
          <h3 className="example-dialog__example-title">{example.title}</h3>
          {example.conversation.map((dialog: string, index: number) => (
            <div key={index}>{dialog}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ExampleDialogTable;

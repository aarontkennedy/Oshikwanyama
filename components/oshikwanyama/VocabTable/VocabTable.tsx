import { Vocab } from "@/types/oshikwanyama";
import "./VocabTable.scss";

const VocabTable = ({ vocab }: { vocab: Vocab[] }): JSX.Element | null => {
  return (
    <table className="vocab-table">
      <tbody>
        {vocab.map((v: Vocab, index: number) => (
          <tr key={`${v.English}_${index}`} className={`vocab-table__row`}>
            <td className={`vocab-table__english`}>{v.English}</td>
            <td className={`vocab-table__kwanyama`}>{v.Oshikwanyama}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VocabTable;

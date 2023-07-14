import { useState } from "react";

export const App = () => {
  const [player, setPlayer] = useState<number>(1);
  const [List, setList] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ]);

  const handClick = (e: React.MouseEvent<HTMLElement>) => {
    if (
      !List[Number(e.currentTarget.id)].indexOf("x") ||
      !List[Number(e.currentTarget.id)].indexOf("o")
    )
      return;

    List.splice(Number(e.currentTarget.id), 1, player === 1 ? "x" : "o");
    setList([...List]);

    player === 1 ? setPlayer(2) : setPlayer(1);
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="grid grid-cols-3 grid-rows-3 gap-2">
        {List.map((a, index) => (
          <div
            className="w-24 h-24 flex justify-center items-center bg-slate-600"
            key={index}
            id={`${index}`}
            onClick={handClick}
          >
            {a}
          </div>
        ))}
      </div>
    </div>
  );
};

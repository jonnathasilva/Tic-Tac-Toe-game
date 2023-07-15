import { useState } from "react";

export const App = () => {
  const [player, setPlayer] = useState<number>(1);
  const [List, setList] = useState<string[]>(Array(9).fill(""));

  const handClick = (e: React.MouseEvent<HTMLElement>) => {
    if (List[Number(e.currentTarget.id)] !== "") return;
    if (checkWinner()) return;

    List.splice(Number(e.currentTarget.id), 1, player === 1 ? "X" : "O");
    setList([...List]);

    console.log(Array(9).fill(""));

    player === 1 ? setPlayer(2) : setPlayer(1);
  };

  const checkWinner = () => {
    let isGain = false;
    const possibleWaysToWin = [
      [List[0], List[1], List[2]],
      [List[3], List[4], List[5]],
      [List[6], List[7], List[8]],

      [List[0], List[3], List[6]],
      [List[1], List[4], List[7]],
      [List[2], List[5], List[8]],

      [List[0], List[4], List[8]],
      [List[6], List[4], List[2]],
    ];

    possibleWaysToWin.forEach((cells) => {
      if (cells.every((cell) => cell === "X")) {
        console.log("Jogador 1 vencel!");
        isGain = true;
      }

      if (cells.every((cell) => cell === "O")) {
        console.log("Jogador 2 vencel!");
        isGain = true;
      }
    });

    return isGain;
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen space-y-4 bg-gray-300">
      <h1 className="text-2xl font-bold text-stone-600">Jogo da Velha</h1>

      <div className="grid grid-cols-3 grid-rows-3 gap-2">
        {List.map((turn, index) => (
          <div
            className={`${turn} w-24 h-24 flex justify-center items-center bg-white rounded`}
            key={index}
            id={`${index}`}
            onClick={handClick}
          >
            {turn}
          </div>
        ))}
      </div>

      <button className="capitalize bg-slate-900 text-white px-4 py-2 rounded">
        reiniciar
      </button>
    </div>
  );
};

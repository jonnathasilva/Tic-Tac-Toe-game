import { useEffect, useState } from "react";

export const App = () => {
  const [player, setPlayer] = useState<number>(1);
  const [isGain, setisGain] = useState<boolean>(false);
  const [List, setList] = useState<string[]>(Array(9).fill(""));

  const handClick = (e: React.MouseEvent<HTMLElement>) => {
    if (List[Number(e.currentTarget.id)] !== "" || isGain) return;

    List.splice(Number(e.currentTarget.id), 1, player === 1 ? "O" : "X");
    setList([...List]);
  };

  const resetGame = () => {
    setList(Array(9).fill(""));
    setisGain(false);
    setPlayer(1);
  };

  const checkWinner = () => {
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
        return setisGain(true);
      }

      if (cells.every((cell) => cell === "O")) {
        console.log("Jogador 2 vencel!");
        return setisGain(true);
      }
    });

    player === 1 ? setPlayer(2) : setPlayer(1);
  };

  useEffect(() => {
    checkWinner();
  }, [List]);

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

      {isGain ? <p>Jogagor {player} ganhou!</p> : null}

      <button
        className="capitalize bg-slate-900 text-white px-4 py-2 rounded"
        onClick={resetGame}
      >
        reiniciar
      </button>
    </div>
  );
};

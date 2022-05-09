import { PublicKey } from "@solana/web3.js";
import { FormEvent, useEffect, useState } from "react";
import { useSerum } from "../../../context/SerumContext";

export const ProgramSelector = () => {
  const { programID, setProgramID } = useSerum();

  const [isChanging, setIsChanging] = useState(false);
  const [customProgramID, setCustomProgramID] = useState(programID.toString());

  const handleProgramChange = (e: FormEvent) => {
    e.preventDefault();
    try {
      setProgramID(customProgramID);
      setIsChanging(false);
    } catch (e) {
      console.error(e);
      // TODO: snackbar
    }
  };

  useEffect(() => {
    setCustomProgramID(programID.toString());
  }, [programID, setCustomProgramID]);

  return (
    <div className="w-full p-4 bg-cyan-700 rounded">
      <h2 className="text-md font-bold">Program Address</h2>
      {!isChanging ? (
        <div className="flex items-center space-x-4">
          <p className="text-sm">{programID.toString().slice(0, 25)}...</p>
          <button
            className="text-sm underline"
            onClick={() => setIsChanging(true)}
          >
            Change
          </button>
        </div>
      ) : (
        <form onSubmit={handleProgramChange} className="mt-2 space-y-2">
          <input
            type="text"
            value={customProgramID}
            onChange={(e) => setCustomProgramID(e.target.value)}
            placeholder="Market Address"
            className="px-4 py-2 w-full rounded bg-transparent border-2 border-cyan-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 w-full rounded bg-cyan-500 hover:bg-cyan-600 text-white"
          >
            Confirm
          </button>
        </form>
      )}
    </div>
  );
};
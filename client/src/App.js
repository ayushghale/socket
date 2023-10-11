import { useState, useEffect } from "react";
import "./index.css";
import { io } from "socket.io-client";

function App() {
  const [message, setMessage] = useState("");
  const [messageDb, setMessageDb] = useState([]);
  const [name, setName] = useState("");
  const socket = io("http://localhost:8080/");

  useEffect(() => {
    // Register the event listener for "public_channel" only once.
    socket.on("public_channel", (data) => {
      setMessageDb((messageDb) => [
        ...messageDb,
        { text: data.text, name: data.gname },
      ]);
      console.log("hihd", data);
      console.log(data.text);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  function sendMessage() {
    socket.emit("public_channel", { text: message, gname: name });
    setMessage("");
  }

  return (
    <div className="flex flex-col text-2xl">
      <h1 className="mx-auto text-5xl underline underline-offset-2">
        {" "}
        Chat Room
      </h1>
      {/* display message */}
      <form>
        <div>
          <h1>Enter Name</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-4 border-black border-solid "
          />
        </div>
        <div className="flex flex-col w-[50%] mx-auto border border-solid border-4 border-black p-4 rounded-xl">
          <div className="h-[800px] flex flex-col overflow-y-scroll  gap-y-2">
            {messageDb.map((item, index) => (
              <div key={index} className="">
                {console.log(item.text)}
                {name === item.name ? (
                  <div className="flex ml-auto w-fit">
                    <div className="flex flex-col px-4 py-2 bg-blue-500 rounded-br-none rounded-2xl">
                      <h1 className="text-lg font-bold">{`${item.name}`}</h1>
                      <p className="left-0 mt-1 ml-auto text-2xl w-fit">
                        {item.text}
                      </p>
                    </div>
                    icon
                  </div>
                ) : (
                  <div className="flex mr-auto w-fit">
                    <div className="flex flex-col px-4 py-2 bg-gray-500 rounded-br-none rounded-2xl">
                      <h1 className="text-lg font-bold">{`${item.name}`}</h1>
                      <p className="left-0 mt-1 ml-auto text-2xl w-fit">
                        {item.text}
                      </p>
                    </div>
                    icon
                  </div>
                )}
              </div>
            ))}
            {/* display message */}
          </div>
          <div className="flex w-full p-2 border border-4 border-black border-solid rounded-xl">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full"
            />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="right-0 px-4 py-2 font-bold text-white bg-blue-500 border-b-4 border-blue-700 rounded shadow hover:bg-blue-400 hover:border-blue-500 "
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
